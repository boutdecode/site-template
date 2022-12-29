const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');

module.exports = class CreateGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.delete');
        this.repository = repository;
    }

    async process({ id }) {
        return await this.repository.remove(id);
    }
}
