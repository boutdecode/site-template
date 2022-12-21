const Gateway = require("../../../../../Shared/Application/Gateway/Gateway");

module.exports = class Read extends Gateway {
    constructor(repository) {
        super('admin.users.read');
        this.repository = repository;
    }

    async process({ id }) {
        return await this.repository.get(id);
    }
}
