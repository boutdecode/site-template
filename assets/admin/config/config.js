import { version, name } from '../../../package.json'
import { Files } from 'lucide-vue-next'

export default {
  application: {
    version,
    name,
    env: import.meta.env.MODE
  },
  translation: {
    locales: ['fr', 'en'],
    locale: 'fr'
  },
  menu: [
    {
      name: 'cms',
      links: [
        {
          name: 'pages',
          icon: Files,
          to: { name: 'cms.pages.index' }
        }
      ]
    }
  ]
}
