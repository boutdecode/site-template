const Validator = require('./Validator');

module.exports = class Schema {
    constructor(data = {}) {
        this.validator = new Validator();
        this.validation = { errors: {}, data, valid: false };
        this.req = null;
    }

    get schema() {
        return {};
    }

    get data() {
        if (!this.validation) {
            return {};
        }

        return this.validation.data;
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

        const validation = this.validator.validate({ ...this.req.body, ...this.req.query }, this.schema);

        this.validation = {
            data: this._getData(validation),
            errors: this._getErrors(validation),
            valid: this._isValid(validation),
        };

        return this.validation.valid;
    }

    _getData(data, result = {}) {
        if (data && typeof data === 'object' && data.result) {
            for (const key in data.result) {
                result[key] = this._getData(data.result[key]);
            }
        } else {
            result = data;
        }

        return result;
    }

    _getErrors(data, errors = {}) {
        if (data && typeof data === 'object' && data.errors) {
            for (const key in data.errors) {
                errors[key] = this._getErrors(data.errors[key]);
            }
        } else {
            errors = data;
        }

        return errors;
    }

    _isValid(data) {
        if (data && typeof data === 'object' && data.result) {
            if (data.valid === false) {
                return false;
            }

            for (const key in data.result) {
                if (!this._isValid(data.result[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    createView() {
        return { ...this.validation, inputs: this.schema };
    }
}
