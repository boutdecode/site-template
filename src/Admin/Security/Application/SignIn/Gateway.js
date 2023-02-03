const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class SignInGateway extends Gateway {
    constructor(repository) {
        super('admin.security.sign_in');
        this.repository = repository;
    }

    async process({ username, password }) {
        const result = await this.repository.findOneByPassword(username, password);
        if (result) {
            this.repository.edit(result._id, { lastLoggedAt: new Date() })
        }

        return result;
    }
}
