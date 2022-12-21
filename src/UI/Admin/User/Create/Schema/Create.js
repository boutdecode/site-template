const Schema = require('../../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Create extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
                _require: true,
            },
            password: {
                _type: 'string',
                _require: true,
            },
            activated: {
                _type: 'boolean',
                _default: false,
            }
        }
    }
}
