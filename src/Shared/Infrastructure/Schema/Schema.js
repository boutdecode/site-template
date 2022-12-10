const Validator = require('./Validator/JSON');

module.exports = {
    validation: null,
    req: null,
    data: {},

    get schema() {
        return {};
    },

    handleRequest(req) {
        this.req = req;
        this.data = { ...req.body, ...req.query };
    },

    isValid() {
        this.validation = Validator.validate(this.data, this.schema, this.req.attributes.locale.split('-'));

        return this.isSubmit() && !this.validation.errors;
    },

    isSubmit() {
        return this.req && this.req.method === 'POST';
    },

    createView() {
        const errors = {};
        if (!this.isSubmit()) {
            return { errors };
        }

        for (const error of this.validation.errors || []) {
            const { message } = error;
            if (error.params.missingProperty) {
                errors[error.params.missingProperty] = message;
            } else if (error.instancePath) {
                errors[error.instancePath.replace('/', '')] = message;
            }
        }

        return { errors };
    },
};
