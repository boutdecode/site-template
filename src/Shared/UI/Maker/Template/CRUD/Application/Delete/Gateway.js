const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class DeleteACMEGateway extends Gateway {
    constructor(repository) {
        super('admin.acme.delete');
        this.repository = repository;
    }

    process({ id }) {
        return this.repository.remove(id);
    }
}
