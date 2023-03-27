const i18next = require('i18next');
const ObjectUtils = require("../Services/ObjectUtils");

module.exports = class I18N {
    constructor(defaultLocale, resources) {
        i18next.init({
            fallbackLng: defaultLocale,
            resources: resources.reduce((config, resource) => {
                return ObjectUtils.deepMerge(config, require(resource));
            }, {}),
        });
    }

    trans(code, options = {}) {
        return i18next.t(code, options);
    }
}
