const Schema = require('../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class SignIn extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
                _required: true,
            },
            password: {
                _type: 'string',
                _required: true,
            },
            'remember-me': {
                _type: 'string',
                _default: false,
            }
        }
    }
}
