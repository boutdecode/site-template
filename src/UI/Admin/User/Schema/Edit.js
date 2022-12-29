const Schema = require('../../../../Shared/Infrastructure/Schema/Schema');

module.exports = class Edit extends Schema {
    get schema() {
        return {
            username: {
                _type: 'string',
                _required: true,
                _label: 'form.label.username',
            },
            password: {
                _type: 'string',
                _label: 'form.label.password',
            },
            activated: {
                _type: 'boolean',
                _default: false,
                _label: 'form.label.user_activated',
            }
        }
    }
}
