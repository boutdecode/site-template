const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class ReadACMEGateway extends Gateway {
    constructor(repository) {
        super('admin.acme.read');
        this.repository = repository;
    }

    process({ id }) {
        return this.repository.get(id);
    }
}
