require('dotenv').config();

module.exports = {
    "application": {
        "env": process.env.APP_ENV,
        "websiteName": "Mon site",
        "websiteContact": "kevinbalicot[alt]gmail.com",
        "metaAuthor": "Kevin Balicot <kevinbalicot[alt]gmail.com>",
        "metaTitle": "Mon site",
        "metaDescription": "Mon site super cool, venez apprendre pleins de truc sur moi.",
        "hostname": process.env.APP_HOSTNAME,
        "securitySalt": process.env.SECURITY_SALT,
        "securityCookie": process.env.SECURITY_COOKIE,
    },

    "cache": {
        'Cache-Control': 'public, max-age=' + (86400 * 30),
        'Content-Encoding': 'gzip',
        'ETag': Date.now(),
        'Vary': 'Accept-Encoding',
    },

    "pug": {
        "globals": {}
    },

    "db": {
        "user": "data/user.db",
        "page": "data/page.db",
        "settings": "data/settings.db",
        "news": "data/news.db",
    },

    "translation": {
        "defaultLocale": process.env.LOCALE,
        "locales": ["fr", "en"],
        "resources": "config/translation/translations.json"
    },

    "images": {
        "uploadFolder": "public/uploads/"
    },

    "assets": {
        "front": "dist/front/entrypoints.json",
        "admin": "dist/admin/entrypoints.json"
    },

    "umami": {
        "url": "https://analytics.boutdecode.fr",
        "websiteId": "182435af-2196-4cd4-9eda-bf28b2f5a51b",
    }
}
