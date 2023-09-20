import { version, name } from '../../../package.json'
import { Files } from "lucide-vue-next"

export default {
    application: {
        version,
        name,
        env: import.meta.env.MODE
    },
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
