import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  title: "orbisz-Blog",
  description: "Carpe diem",
  head: [
    ['link', { rel: 'icon', href: '/favicon1.ico' }]
  ],
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    logo: "/logo1.jpg",
    author: "orbisz",
    authorAvatar: "/head.jpg",
    //docsRepo: "https://github.com/orbisz",
    //docsRepo: "https://blog.csdn.net/hywzxy",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "IconHome" },
      { text: '留言板', link: '/docs/message-board', icon: 'IconChat' },
      { text: 'CSDN', link: 'https://blog.csdn.net/hywzxy', icon:'IconCSDN' },
      { text: 'Github', link: 'https://github.com/orbisz', icon:'IconGithub' },
      {
        text: "项目体验",
        children: [
          { text: "大营销项目体验", link: "http://121.4.26.112.3000" },
          //{ text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      //{ text: "分类", link: "/categories/backend", icon: "Category" },
      //{ text: "Home", link: "/" },
      //{ text: "Categories", link: "/categories/reco/1.md.html" },
      //{ text: "Tags", link: "/tags/tag1/1.md.html" },
      //{ text: "标签", link: "/tags/backend/Java", icon: "Tag" },
      //{ text: '时间轴', link: '/timeline', icon: 'Time' },
      //{
      //  text: "Docs",
      //  children: [
      //    { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
      //    { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //  ],
      //},
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'JxNf3dIhbSCfRjjUdxdYxX9i-gzGzoHsz', // your appId
        appKey: '20lD94LhgdhSsNJ4FPYL4Pf8', // your appKey
        // placeholder: '填写邮箱可以收到回复提醒哦！',
        //     // verify: true, // 验证码服务
        //     // notify: true,
        //     // recordIP: true,
        //     // hideComments: true // 隐藏评论
      },
    },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.md.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
