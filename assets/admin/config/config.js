import { version, name, bugs } from '../../../package.json'
import { Files, Users, Settings, HelpCircle } from 'lucide-vue-next'
import config from './../lib/wysiwyg'

export default {
  application: {
    version,
    name,
    env: import.meta.env.MODE,
    issue: bugs ? bugs.url : null
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
    },
    {
      name: 'admin',
      links: [
        {
          name: 'admins',
          icon: Users,
          to: { name: 'admin.users.index' }
        },
        {
          name: 'settings',
          icon: Settings,
          to: { name: 'admin.settings.index' }
        },
        {
          name: 'about',
          icon: HelpCircle,
          to: { name: 'admin.about' }
        }
      ]
    }
  ],
  editor: {
    apiKey: import.meta.env.VITE_TINYMCE_KEY,
    config
  }
}
