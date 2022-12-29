const Gateway = require("../../../../../Shared/Application/Gateway/Gateway");

module.exports = class ReadGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.read');
        this.repository = repository;
    }

    async process({ id }) {
        return await this.repository.get(id);
    }
}
