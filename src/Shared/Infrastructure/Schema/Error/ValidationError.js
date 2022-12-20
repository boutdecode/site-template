module.exports = class ValidationError extends Error {
    constructor(errors, message) {
        super(message);

        this.errors = errors;
    }
}
