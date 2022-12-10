const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, message: false });
const localize = require('ajv-i18n');

module.exports = {
    validate(data, schema, locale = 'default') {
        const validate = ajv.compile(schema);
        validate(data);

        if (validate.errors && localize[locale]) {
            localize[locale](validate.errors);
        }

        return validate;
    }
}
