const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class BrowsePageGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.browse');
        this.repository = repository;
    }

    async process({ search, page = 1, limit }) {
        const skip = (page - 1) * limit;

        return await this.repository.search(search, skip, limit);
    }
}
