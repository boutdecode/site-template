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
    }
  ]
})

export default router
