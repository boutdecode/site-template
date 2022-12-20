const Schema = require('../../../../../Shared/Infrastructure/Schema/Schema');

module.exports = {
    ...Schema,

    get schema() {
        return {
            type: 'object',
            properties: {
                search: {
                    type: 'string'
                },
                page: {
                    type: 'number',
                    default: 1,
                },
                limit: {
                    type: 'number',
                    default: 25,
                }
            },
            required: ['page', 'limit']
        }
    }
};
