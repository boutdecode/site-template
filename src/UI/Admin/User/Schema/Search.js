const Schema = require('../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Search extends Schema {
    get schema() {
        return {
            search: {
                _type: 'string',
                _options: {
                    className: {
                        widget: 'me-2',
                    },
                    attr: {
                        placeholder: 'searching',
                    }
                }
            },
            page: {
                _type: 'number',
                _default: 1,
                _parseInt: true,
            },
            limit: {
                _type: 'select_number',
                _default: 25,
                _parseInt: true,
                _options: {
                    className: {
                        widget: 'me-2',
                    },
                    choices: {
                        25: 25,
                        50: 50,
                        100: 100
                    }
                }
            }
        }
    }
}
