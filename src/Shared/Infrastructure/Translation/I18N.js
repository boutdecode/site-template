const i18next = require('i18next');

module.exports = class I18N {
    constructor(resources) {
        i18next.init({
            fallbackLng: process.env.LOCALE || 'en',
            resources: require(resources),
        });
    }

    trans(code, options = {}) {
        return i18next.t(code, options);
    }
}
