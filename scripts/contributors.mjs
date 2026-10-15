#!/usr/bin/env node
/**
 * 从 Git 历史生成贡献者数据（.vitepress/contributors-data.json）
 *
 * 贡献者的 GitHub 账号通过 GitHub API 自动识别（按提交邮箱匹配账号），
 * 无需手动维护映射表：
 *   - GitHub noreply 邮箱：本地直接解析，不联网；
 *   - 其他邮箱：取该邮箱的一次提交，查询 Commits API 的 author 字段
 *     （GitHub 会用账号绑定的邮箱匹配，包括未公开的私密邮箱）；
 *   - 查询结果缓存在 .vitepress/contributors-cache.json 并随仓库提交，
 *     因此每次构建只有「新出现」的邮箱才需要联网查询一次。
 *
 * 在 docs:dev / docs:build 前自动运行（见 package.json scripts）。
 *
 * 可选优化：设置环境变量 GITHUB_TOKEN（只读、无 scope 即可）
 * 可大幅提升 API 限额，推荐在 Cloudflare Pages 构建环境中配置。
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REPO = 'LuBanQAQ/DNUI-Survival-Guide'

// 仅用于 GitHub API 也无法识别的历史提交邮箱（例如项目脚手架提交）。
// 正常情况无需维护：新贡献者用 GitHub 关联邮箱提交即可自动识别。
const EMAIL_ALIAS = {
  'survive@dnui.cc': 'LuBanQAQ',
}

// 与 config.mts 的 srcExclude 保持一致（这些文件不构建页面）
const EXCLUDE = [/^README\.md$/i, /^CONTRIBUTING\.md$/i, /^\.github\//]

const DATA_FILE = resolve(process.cwd(), '.vitepress/contributors-data.json')
const CACHE_FILE = resolve(process.cwd(), '.vitepress/contributors-cache.json')

const git = (...args) => execFileSync('git', args, { encoding: 'utf-8' }).trim()

// 浅克隆环境下补全历史（部分 CI 只 fetch 单个提交，会导致统计不完整）
try {
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    console.log('[contributors] 检测到浅克隆，尝试获取完整历史…')
    execFileSync('git', ['fetch', '--unshallow', '--quiet'], { stdio: 'ignore' })
  }
} catch {
  console.warn('[contributors] 无法补全 Git 历史，将使用现有提交记录统计')
}

// ---- 1. 解析 Git 历史 ----
const commits = git('log', '--all', '--format=%H%x09%an%x09%ae')
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [sha, name, email] = line.split('\t')
    return { sha, name, email }
  })

// email → login 持久缓存（查询结果随仓库提交）
const cache = existsSync(CACHE_FILE)
  ? JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
  : {}
let cacheDirty = false

const noreplyLogin = (email) =>
  email.match(/^(?:\d+\+)?([a-z0-9-]+)@users\.noreply\.github\.com$/i)?.[1]

async function loginOf(email, sha) {
  const alias = EMAIL_ALIAS[email.toLowerCase()]
  if (alias) return alias
  const noreply = noreplyLogin(email)
  if (noreply) return noreply
  if (email in cache) return cache[email] ?? undefined
  if (!sha) return undefined

  try {
    const headers = {
      accept: 'application/vnd.github+json',
      'user-agent': 'dnui-survival-guide-contributors',
    }
    if (process.env.GITHUB_TOKEN) {
      headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits/${sha}`,
      { headers },
    )
    if (res.status === 403 || res.status === 429) {
      console.warn(
        `[contributors] GitHub API 限流，${email} 本次跳过（可设置 GITHUB_TOKEN 环境变量）`,
      )
      return undefined // 不写缓存，下次再查
    }
    if (!res.ok) return undefined
    const json = await res.json()
    cache[email] = json.author?.login ?? null // null 也缓存：该邮箱未绑定任何账号
    cacheDirty = true
    return cache[email] ?? undefined
  } catch (err) {
    console.warn(`[contributors] 查询 ${email} 失败：${err.message}`)
    return undefined
  }
}

// 每个邮箱取一个代表提交（用于 API 查询）
const shaByEmail = new Map()
const nameByEmail = new Map()
for (const c of commits) {
  if (!shaByEmail.has(c.email)) shaByEmail.set(c.email, c.sha)
  if (!nameByEmail.has(c.email)) nameByEmail.set(c.email, c.name)
}

// 逐个解析（已缓存 / noreply / 别名的不联网）
const loginByEmail = new Map()
for (const [email, sha] of shaByEmail) {
  loginByEmail.set(email, await loginOf(email, sha))
}
if (cacheDirty) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n')
}

// 同一账号（或未识别账号的邮箱）合并为一个人
const keyOf = (email) => loginByEmail.get(email) ?? `email:${email}`

// ---- 2. 页面级贡献者（首作者在前）----
const files = git('ls-files', '*.md')
  .split('\n')
  .filter(Boolean)
  .filter((f) => !EXCLUDE.some((re) => re.test(f)))

const perFile = {}
for (const f of files) {
  let out = ''
  try {
    out = git('log', '--format=%ae', '--', f)
  } catch {
    continue
  }
  const seen = new Set()
  const list = []
  for (const email of out.split('\n').filter(Boolean).reverse()) {
    const key = keyOf(email)
    if (seen.has(key)) continue
    seen.add(key)
    list.push({
      name: nameByEmail.get(email) ?? email,
      email,
      github: loginByEmail.get(email),
    })
  }
  if (list.length) perFile[f] = list
}

// ---- 3. 总体贡献（按提交数排序）----
const byPerson = new Map()
for (const c of commits) {
  const key = keyOf(c.email)
  const github = loginByEmail.get(c.email)
  const prev = byPerson.get(key)
  if (prev) prev.commits += 1
  else {
    byPerson.set(key, {
      name: github ?? c.name,
      email: c.email,
      github,
      commits: 1,
    })
  }
}
const overall = [...byPerson.values()].sort((a, b) => b.commits - a.commits)

// ---- 4. 写出贡献者数据 ----
writeFileSync(
  DATA_FILE,
  JSON.stringify(
    { generatedAt: new Date().toISOString(), perFile, overall },
    null,
    2,
  ) + '\n',
)

const resolved = overall.filter((c) => c.github).length
console.log(
  `[contributors] ${overall.length} 位贡献者（${resolved} 位已识别 GitHub 账号），${Object.keys(perFile).length} 个页面`,
)
