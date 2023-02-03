const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class EditUserGateway extends Gateway {
    constructor(repository) {
        super('admin.users.edit');
        this.repository = repository;
    }

    async process({ id, username, password, activated }) {
        return await this.repository.edit(id, { username, password, activated });
    }
}
