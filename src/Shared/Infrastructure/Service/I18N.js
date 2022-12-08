const i18next = require('i18next');
i18next.init({
    lng: process.env.LOCALE || 'en',
    fallbackLng: 'en',
    resources: require('../../../../config/translation/translations.json')
});

module.exports = {
    trans: (code, options = {}) => {
        return i18next.t(code, options);
    },
}
