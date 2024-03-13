import { version, name } from '../../../package.json'
import { Files, Users } from 'lucide-vue-next'
import config from './../lib/wysiwyg'

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
    },
    {
      name: 'admin',
      links: [
        {
          name: 'admins',
          icon: Users,
          to: { name: 'admin.users.index' }
        }
      ]
    }
  ],
  editor: {
    apiKey: '9kur7zji49oj6z1o7agb4vq8vqv3m0tnvb7vdaoqgsa3cdag',
    config
  }
}
