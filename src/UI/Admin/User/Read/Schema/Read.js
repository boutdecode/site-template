const Schema = require('../../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Read extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
            },
            password: {
                _type: 'string',
            },
            activated: {
                _type: 'boolean',
            }
        }
    }
}
