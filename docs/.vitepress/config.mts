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
            { text: 'DML', link: '/guide/mysql/dml' },
            { text: 'DQL', link: '/guide/mysql/dql' },
            { text: 'DCL', link: '/guide/mysql/dcl' },
            { text: '函数', link: '/guide/mysql/function' },
            { text: '字段约束', link: '/guide/mysql/constraint' },
            { text: '多表查询', link: '/guide/mysql/query' },
            { text: '事务', link: '/guide/mysql/affair' },
          ]
        }
      ],
      '/guide/small/':[
        {
          text:'项目中的小功能',
          items:[
            {text:'全屏',link:'/guide/small/fullScreen'},
            {text:'国际化',link:'/guide/small/language'}
          ]
        }
      ]
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
