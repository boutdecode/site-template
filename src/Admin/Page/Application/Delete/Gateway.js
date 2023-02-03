const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class DeletePageGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.delete');
        this.repository = repository;
    }

    async process({ id }) {
        const page = await this.repository.get(id);
        if (page.isFactory) {
            throw new Error(`Page ${page.slug} cannot be deleted because is factory resource.`);
        }

        return await this.repository.remove(id);
    }
}
