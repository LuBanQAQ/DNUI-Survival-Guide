/**
 * 友链数据（单一数据源）
 *
 * 同时用于：友链页（FriendLinks 卡片）与首页页脚（HomeFriends 链接条）。
 * 新增友链时只改这里。
 */
export interface Friend {
  /** 站点名称 */
  name: string
  /** 站点地址 */
  url: string
  /** 简介（首页显示为悬停提示） */
  desc: string
  /** 图标（emoji 或短文本） */
  icon: string
  /** 展示用域名 */
  domain: string
}

export const friends: Friend[] = [
  {
    name: '大连奶龙大学',
    url: 'https://xn--pssa0vz4e155inzt.com/',
    desc: '东软校园趣味创作：六大脑洞学院、趣味校训与入学纪念卡',
    icon: '🐲',
    domain: '大连奶龙大学.com',
  },
  {
    name: 'ACM 编程爱好者社官网',
    url: 'https://acm.dnui.cc/',
    desc: '社团官方网站：训练、赛事（ICPC / CCPC / 蓝桥杯 / 天梯赛）与加入方式',
    icon: '</>',
    domain: 'acm.dnui.cc',
  },
  {
    name: 'NSS Cybersecurity Lab',
    url: 'https://nss.dnui.cc/',
    desc: '网络安全工作室官网：Web 安全、二进制安全、逆向工程与网络攻防',
    icon: '🛡',
    domain: 'nss.dnui.cc',
  },
  {
    name: '微光网络工作室',
    url: 'https://shimmer.neusoft.edu.cn/',
    desc: '学生 Web 技术团队官网：校园产品与「微光后院」博客',
    icon: '✨',
    domain: 'shimmer.neusoft.edu.cn',
  },
  {
    name: 'Yunlk 的博客',
    url: 'https://yunlk.icu/',
    desc: '本站贡献者 Yunlk 的个人博客',
    icon: '📖',
    domain: 'yunlk.icu',
  },
]
