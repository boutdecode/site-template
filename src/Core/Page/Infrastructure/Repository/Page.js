const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");
const HttpError = require("../../../../Shared/Infrastructure/HTTP/Error/HttpError");

module.exports = class PageRepository extends CRUDRepository {
    constructor(requester) {
        super(requester, 'page');
    }

    async findBySlug(slug) {
        return await super.findOne({ slug });
    }

    async findActivatedBySlug(slug) {
        const page = await super.findOne({ slug, activated: true });
        if (!page) {
            throw new HttpError('Page not found', 404);
        }

        return page;
    }

    async search(search = null, skip = 0, limit = 25) {
        const params = {};
        if (search) {
            params.slug = new RegExp(search, 'i');
        }

        return await super.find(params, limit, skip);
    }
};
