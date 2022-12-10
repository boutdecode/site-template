const Schema = require('../../../../Shared/Infrastructure/Schema/Schema');

module.exports = {
    ...Schema,

    get schema() {
        return {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            },
            required: ['username', 'password']
        }
    }
};
