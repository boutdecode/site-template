const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');
const { slugify } = require('../../../../../Shared/Infrastructure/Services/String');

module.exports = class CreateGateway extends Gateway {
    repository;
    constructor(repository) {
        super('admin.pages.create');
        this.repository = repository;
    }

    async process({ slug, title, shortDescription, content, isFactory, activated }) {
        const slugResult = slugify(slug);
        const alreadyPage = await this.repository.findBySlug(slugResult);
        if (alreadyPage) {
            throw new Error(`Page with slug ${slugResult} already exists.`);
        }

        return await this.repository.create({ slug: slugResult, title, shortDescription, content, isFactory, activated });
    }
}
