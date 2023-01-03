const Schema = require("./Schema");
const boxstore = require('boxstore');

module.exports = class TranslatableSchema extends Schema {
    translatableInputs(type = 'string', required = true, options = {}) {
        const result = {};
        boxstore.get('config.translation.locales', []).forEach(locale => result[locale] = {
            _type: type,
            _label: `locale_${locale}`,
            _required: required,
            _options: options,
        });

        return result;
    }
}
