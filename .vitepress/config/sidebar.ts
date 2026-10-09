import type { DefaultTheme } from 'vitepress'

import { clubGroups } from './clubs-sidebar'

/**
 * 全站侧边栏
 *
 * 顶级只保留少量大类，相关小类以折叠分组收纳在大类之下；
 * 新增文章时，在对应分组的 items 里追加一行即可，例如：
 *
 *   { text: '报到流程', link: '/freshman/checkin' }
 */
const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '新生指南',
    items: [
      { text: '序', link: '/freshman/' },
      { text: '选课与学分', link: '/freshman/course-selection' },
      { text: '转专业', link: '/freshman/major-transfer' },
      { text: '大一常见误区', link: '/freshman/pitfalls' },
      { text: 'DNUI 名词表', link: '/freshman/glossary' },
    ],
  },
  {
    text: '校园生活',
    items: [
      { text: '序', link: '/campus/' },
      { text: '食堂与校内餐饮', link: '/campus/canteen' },
      { text: '出行与校园周边', link: '/campus/transport' },
      { text: '校内消费与门禁', link: '/campus/daily-services' },
      { text: '校园网络与信息化服务', link: '/campus/it-services' },
      { text: '信息化服务常见问题', link: '/campus/it-faq' },
      { text: 'DNUI 常用网站导航', link: '/campus/website-navigation' },
    ],
  },
  {
    text: '学生组织',
    items: [
      { text: '序', link: '/student-orgs/' },
      { text: '校级组织', link: '/student-orgs/university' },
      { text: '微光网络工作室', link: '/student-orgs/shimmer' },
      { text: 'ACM编程爱好者社', link: '/student-orgs/acm' },
      { text: '网络安全工作室', link: '/student-orgs/network-security-studio' },
      { text: '院级组织', link: '/student-orgs/college' },
      {
        text: '学生社团',
        collapsed: true,
        items: [{ text: '名录总览', link: '/student-orgs/clubs/' }, ...clubGroups],
      },
    ],
  },
  {
    text: '学习指南',
    items: [
      { text: '序', link: '/study/' },
      { text: '绩点、考试与复习', link: '/study/gpa-and-exams' },
      { text: '英语课与四六级', link: '/study/english' },
      { text: '学习工具与资源', link: '/study/tools' },
      { text: '时间管理', link: '/study/time-management' },
      { text: '行动力杂谈', link: '/study/musings-on-the-power-of-action' },
      { text: '体育课、校园跑与体质测试', link: '/study/pe-and-fitness' },
      {
        text: '评优与学分',
        collapsed: true,
        items: [
          { text: '奖学金', link: '/study/scholarships' },
          { text: '学年评优', link: '/study/awards' },
          { text: '素质教育学分与创新创业实践学分', link: '/study/quality-credits' },
        ],
      },
      {
        text: '课程指南',
        collapsed: true,
        items: [
          { text: '课程概览', link: '/courses/' },
          { text: '微电子专业基础课体验', link: '/courses/microelectronics-basics' },
          { text: '作业、实验与课程设计', link: '/courses/assignments' },
          { text: '课程免听', link: '/courses/course-exemption' },
          { text: '高数与线代笔记（微电子专业）', link: '/courses/math-notes' },
        ],
      },
      {
        text: '计算机方向',
        collapsed: true,
        items: [
          { text: '方向概览', link: '/cs/' },
          { text: '从零开始学编程：一条自学路线', link: '/cs/learning-path' },
          { text: '计算机学习常用网站', link: '/cs/websites' },
        ],
      },
      {
        text: '竞赛',
        collapsed: true,
        items: [
          { text: '竞赛概览', link: '/competition/' },
          { text: '竞赛类别与课程加分', link: '/competition/levels' },
          { text: '蓝桥杯', link: '/competition/lanqiao' },
          { text: '团体程序设计天梯赛', link: '/competition/gplt' },
          { text: 'ACM-ICPC 与 CCPC', link: '/competition/icpc-ccpc' },
          { text: '传智杯', link: '/competition/chuangzhi' },
          { text: '全国大学生数学建模竞赛', link: '/competition/math-modeling' },
          { text: '集创赛', link: '/competition/ic-design' },
          { text: '全国大学生职业规划大赛', link: '/competition/career-planning' },
        ],
      },
      {
        text: '实习就业',
        collapsed: true,
        items: [{ text: '概览', link: '/career/' }],
      },
      {
        text: '升学',
        collapsed: true,
        items: [
          { text: '概览', link: '/postgraduate/' },
          { text: '升学这件事：当下的想法', link: '/postgraduate/thinking' },
        ],
      },
    ],
  },
  {
    text: '经验分享',
    items: [
      { text: '序', link: '/experience/' },
      { text: '大学四年怎么走', link: '/experience/four-years' },
      { text: '社团值不值得参加', link: '/experience/clubs' },
      { text: '从前的网安和现在的网安', link: '/experience/cybersecurity-then-and-now' },
      { text: '方向选择：电子与嵌入式', link: '/experience/direction' },
    ],
  },
  {
    text: '关于',
    items: [
      { text: '参与贡献', link: '/contribute/' },
      { text: '内容编写指南', link: '/contribute/writing' },
      { text: '关于项目', link: '/about/' },
      { text: '致谢', link: '/acknowledgments' },
    ],
  },
]

export default sidebar
