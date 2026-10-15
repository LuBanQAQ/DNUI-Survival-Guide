import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import AllContributors from './AllContributors.vue'
import Contributors from './Contributors.vue'
import FriendLinks from './FriendLinks.vue'
import HomeFriends from './HomeFriends.vue'

import './custom.css'

/**
 * 自定义主题：基于 VitePress 默认主题扩展。
 *
 * - 每个内容页底部显示「本文贡献者」（数据由 scripts/contributors.mjs 生成）；
 * - 首页底部显示友链条（数据见 theme/friends.ts）；
 * - 页脚由 VitePress 默认主题渲染，配置见 config.mts 的 themeConfig.footer；
 * - <AllContributors />、<FriendLinks /> 组件可在 Markdown 中使用。
 */
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Contributors),
      'home-features-after': () => h(HomeFriends),
    }),
  enhanceApp({ app }) {
    app.component('AllContributors', AllContributors)
    app.component('FriendLinks', FriendLinks)
  },
} satisfies Theme
