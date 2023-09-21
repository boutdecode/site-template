import { version, name } from '../../../package.json'
import { Files } from 'lucide-vue-next'
import usePagesStore from '../stores/pages'
import PageBrowse from '../components/cms/Browse.vue'

export default {
  application: {
    version,
    name,
    env: import.meta.env.MODE
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/cms/pages',
      name: 'cms:pages:browse',
      component: () => import('../views/crud/BrowseView.vue'),
      props: {
        store: usePagesStore,
        template: PageBrowse,
        title: 'Pages'
      }
    }
  ],
  menu: [
    {
      name: 'cms',
      links: [
        {
          name: 'pages',
          icon: Files,
          url: '/cms/pages'
        }
      ]
    }
  ]
}
