const Schema = require('../../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Search extends Schema {
    get schema() {
        return {
            search: {
                _type: 'string',
            },
            page: {
                _type: 'number',
                _default: 1,
                _parseInt: true,
            },
            limit: {
                _type: 'number',
                _default: 1,
                _parseInt: true,
            }
        }
    }
}
