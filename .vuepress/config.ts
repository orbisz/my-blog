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
    docsRepo: "https://github.com/orbisz",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      { text: "分类", link: "/categories/xiangmukaifa/1.html", icon: "Category" },
      //{ text: "Home", link: "/" },
      //{ text: "Categories", link: "/categories/reco/1.html" },
      //{ text: "Tags", link: "/tags/tag1/1.html" },
      { text: "标签", link: "/tags/Java/1.html", icon: "Tag" },
      //{ text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
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
    //   // options 与 1.x 的 valineConfig 配置一致
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
