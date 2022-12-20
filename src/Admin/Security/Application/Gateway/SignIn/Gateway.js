const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');

module.exports = class SignIn extends Gateway {
    constructor(repository) {
        super('admin.security.sign_in');
        this.repository = repository;
    }

    async process({ username, password }) {
        return await this.repository.findOneByPassword(username, password);
    }
}
