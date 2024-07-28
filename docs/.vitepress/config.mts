import { defineConfig } from 'vitepress'
export default defineConfig({
  base:'/blog/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "finyou",
  description: "这个是我的博客",
  themeConfig: {
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
      ],
      '/guide/interView/':[
        {
          text:'面经',
          items:[
            {text:'let、const和var的区别',link:'/guide/interView/index'},
            {text:'白屏问题',link:'/guide/interView/whiteScreen'},
            {text:'导包方式',link:'/guide/interView/modul'},
            {text:'防抖和节流',link:'/guide/interView/debAndThr'},
          ]
        }
      ],
      '/guide/es6/':[
        {
          text:'javaScript',
          items:[
            {text:'作用域',link:'/guide/es6/index'},
            {text:'结构赋值',link:'/guide/es6/StructuralAssignment'},
            {text:'事件循环',link:'/guide/es6/eventLoop'}
          ]
        }
      ],
      '/guide/uniapp/':[
        {
          text:'uniapp',
          items:[
            {text:'自定义导航栏',link:'/guide/uniapp/customNav'},
            {text:'拦截器',link:'/guide/uniapp/Interceptor'},
            {text:'tabBar',link:'/guide/uniapp/tabBar'},
          ]
        }
      ],
      '/guide/git/':[
        {
          text:'git',
          items:[
            {text:'常见命令',link:'/guide/git/index'},
          ]
        }
      ],
      '/guide/styleCss/':[
        {
          text:'css样式库',
          items:[
            {text:'tailwindcss',link:'/guide/styleCss/index'},
          ]
        }
      ],
      '/guide/vue/':[
        {
          text:'vue学习',
          items:[
            {text:'基础',link:'/guide/vue/index'},
            {text:'全局自定义指令',link:'/guide/vue/direct'},
            {text:'组件间的通信',link:'/guide/vue/information'},
          ]
        }
      ]
    },

   
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
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  lang: 'zh',
})
