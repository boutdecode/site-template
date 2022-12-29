const Gateway = require('../../../../../Shared/Application/Gateway/Gateway');
const { slugify } = require('../../../../../Shared/Infrastructure/Services/String');

module.exports = class CreateGateway extends Gateway {
    repository;
    constructor(repository) {
        super('admin.pages.create');
        this.repository = repository;
    }

    async process({ slug, title, shortDescription, content, activated }) {
        const alreadyPage = await this.repository.findBySlug(slug);
        if (alreadyPage) {
            throw new Error(`Page with slug ${slug} already exists.`);
        }

        return await this.repository.create({ slug: slugify(slug), title, shortDescription, content, activated });
    }
}
