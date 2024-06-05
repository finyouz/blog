import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/blog/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "finyou",
  description: "这个是我的博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' }
    ],
    logo:'/logo.jpg',

    sidebar: {
      '/guide/mysql/': [
        {
          text: 'MySQL',
          items: [
            { text: 'DDL', link: '/guide/mysql/ddl' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    lastUpdated: {
      text: '更新日期',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    sidebarMenuLabel:'菜单',
    returnToTopLabel:'返回顶端',
    outline:{
      label:'页面导航'
    }
  },
  lang: 'zh',
  
})
