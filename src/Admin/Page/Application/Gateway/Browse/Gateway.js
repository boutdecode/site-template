const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');

module.exports = class BrowseGateway extends Gateway {

    constructor(repository) {
        super('admin.pages.browse');
        this.repository = repository;
    }

    async process({ search, skip, limit }) {
        return await this.repository.search(search, limit, skip);
    }
}
