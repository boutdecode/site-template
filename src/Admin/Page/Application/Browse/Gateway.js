const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class BrowsePageGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.browse');
        this.repository = repository;
    }

    async process({ search, page = 1, limit }) {
        const skip = (page - 1) * limit;
        const count = await this.repository.searchCount(search);
        const items = await this.repository.search(search, skip, limit);

        return { items, count };
    }
}