import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'
import Login from '@/components/Login'

//commets
import CommentIndex from '@/components/Comments/Index'
import CommentCreate from '@/components/Comments/CreateComment'
import CommentEdit from '@/components/Comments/EditComment'
import CommentShow from '@/components/Comments/ShowComment'

//Blog
import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'


//Table
import TableIndex from '@/components/Tables/Index'
import TableCreate from '@/components/Tables/CreateTable'
import TableEdit from '@/components/Tables/EditTable'
import TableShow from '@/components/Tables/ShowTable'

// upload testing
import Upload from '@/components/Utils/Upload'

Vue.use(Router)

export default new Router({
  mode:'history',
  
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    //authen
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    //blog
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },

      //comments
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/comment/create',
      name: 'comment-edit',
      component: CommentCreate
    },
    {
      path: '/comment/edit/:commentId',
      name: 'comment-edit',
      component: CommentEdit
    },
    {
      path: '/comment/:commentId',
      name: 'comment',
      component: CommentShow
    },


     //table
     {
      path: '/tables',
      name: 'tables',
      component: TableIndex
    },
    {
      path: '/table/create',
      name: 'table-create',
      component: TableCreate
    },
    {
      path: '/table/edit/:tableId',
      name: 'table-edit',
      component: TableEdit
    },
    {
      path: '/table/:tableId',
      name: 'table',
      component: TableShow
    },

    // upload testing
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },


  ]
})
