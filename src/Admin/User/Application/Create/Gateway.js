const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class CreateUserGateway extends Gateway {
    repository;
    constructor(repository) {
        super('admin.users.create');
        this.repository = repository;
    }

    async process({ username, password, activated }) {
        const alreadyUser = await this.repository.findByIdentifier(username);
        if (alreadyUser) {
            throw new Error(`User with username ${username} already exists.`);
        }

        return await this.repository.create({ username, password, activated });
    }
}
