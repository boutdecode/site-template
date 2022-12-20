const Validator = require('./Validator');

module.exports = class Schema {
    constructor() {
        this.validator = new Validator();
        this.validation = { errors: {} };
        this.req = null;
    }

    get schema() {
        return {};
    }

    get data() {
        if (!this.validation) {
            return {};
        }

        return this.validation.result;
    }

    handleRequest(req) {
        this.req = req;

        this.validator.locale = req.attributes.locale || process.env.LOCALE || 'en';
    }

    isSubmit() {
        if (!this.req) {
            return false;
        }

        return this.req.method === 'POST' || Object.entries(this.req.query).length > 0;
    }

    isValid() {
        if (!this.isSubmit()) {
            return false;
        }

        this.validation = this.validator.validate({ ...this.req.body, ...this.req.query }, this.schema);

        return this.validation.valid;
    }

    createView() {
        return this.validation;
    }
}
