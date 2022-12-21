const Schema = require('../../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Edit extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
                _require: true,
            },
            password: {
                _type: 'string',
            },
            activated: {
                _type: 'boolean',
                _default: false,
            }
        }
    }
}
