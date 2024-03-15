import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/cms/pages',
      name: 'cms.pages.index',
      component: () => import('../views/cms/Pages.vue')
    },
    {
      path: '/cms/pages/:id/edit',
      name: 'cms.pages.edit',
      component: () => import('../views/cms/EditPage.vue')
    },
    {
      path: '/cms/pages/create',
      name: 'cms.pages.create',
      component: () => import('../views/cms/EditPage.vue')
    },
    {
      path: '/administration/users',
      name: 'admin.users.index',
      component: () => import('../views/admin/Users.vue')
    },
    {
      path: '/administration/users/:id/edit',
      name: 'admin.users.edit',
      component: () => import('../views/admin/EditUser.vue')
    },
    {
      path: '/administration/users/create',
      name: 'admin.users.create',
      component: () => import('../views/admin/EditUser.vue')
    },
    {
      path: '/administration/settings',
      name: 'admin.settings.index',
      component: () => import('../views/admin/Settings.vue')
    },
    {
      path: '/administration/about',
      name: 'admin.about',
      component: () => import('../views/admin/About.vue')
    }
  ]
})

export default router
