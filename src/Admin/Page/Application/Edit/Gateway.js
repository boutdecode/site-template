const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class EditPageGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.edit');
        this.repository = repository;
    }

    async process({ id, title, shortDescription, content, activated }) {
        return await this.repository.edit(id, { title, shortDescription, content, activated });
    }
}
