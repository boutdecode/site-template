const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class EditACMEGateway extends Gateway {
    constructor(repository) {
        super('admin.acme.edit');
        this.repository = repository;
    }

    process({ id, ...data }) {
        return this.repository.edit(id, data);
    }
}
