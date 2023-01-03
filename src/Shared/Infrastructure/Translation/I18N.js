const i18next = require('i18next');

module.exports = class I18N {
    constructor(defaultLocale, resources) {
        i18next.init({
            fallbackLng: defaultLocale,
            resources: require(resources),
        });
    }

    trans(code, options = {}) {
        return i18next.t(code, options);
    }
}
