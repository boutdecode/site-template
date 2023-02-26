const Gateway = require('../../../../Shared/Application/Gateway/Gateway');

module.exports = class CreateACMEGateway extends Gateway {

    constructor(repository) {
        super('admin.acme.create');
        this.repository = repository;
    }

    process(data) {
        return this.repository.create(data);
    }
}
