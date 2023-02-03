const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class DeleteUserGateway extends Gateway {
    constructor(repository) {
        super('admin.users.delete');
        this.repository = repository;
    }

    async process({ id }) {
        return await this.repository.remove(id);
    }
}
