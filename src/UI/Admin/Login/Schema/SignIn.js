const Schema = require('../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class SignIn extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
                _required: true,
                _label: 'form.label.username',
            },
            password: {
                _type: 'password',
                _required: true,
                _label: 'form.label.password',
            },
            'remember-me': {
                _type: 'boolean',
                _default: false,
                _label: 'form.label.remember_me',
            }
        }
    }
}
