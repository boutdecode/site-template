const Gateway = require("../../../../../Shared/Application/Gateway/Gateway");
const { slugify } = require("../../../../../Shared/Infrastructure/Services/String");

module.exports = class EditGateway extends Gateway {
    constructor(repository) {
        super('admin.pages.edit');
        this.repository = repository;
    }

    async process({ id, slug, title, shortDescription, content, activated }) {
        const alreadyPage = await this.repository.findBySlug(slug);
        if (alreadyPage) {
            throw new Error(`Page with slug ${slug} already exists.`);
        }

        return await this.repository.edit(id, { slug: slugify(slug), title, shortDescription, content, activated });
    }
}
