const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');

module.exports = class List extends Gateway {
    repository;
    constructor(repository) {
        super('admin.users.list');
        this.repository = repository;
    }

    async process({ search, skip, limit }) {
        return await this.repository.list(search, skip, limit);
    }
}
