const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class FrontReadPageGateway extends Gateway {
    constructor(repository) {
        super('front.pages.read');
        this.repository = repository;
    }

    async process({ slug }) {
        return await this.repository.findActivatedBySlug(slug);
    }
}
