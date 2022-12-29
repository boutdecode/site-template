const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");

module.exports = class PageRepository extends CRUDRepository {
    constructor(requester) {
        super(requester, 'page');
    }

    async findBySlug(slug) {
        return await super.findOne({ slug });
    }

    async search(search = null, skip = 0, limit = 25) {
        const params = {};
        if (search) {
            params.slug = new RegExp(search, 'i');
        }

        return await super.find(params, limit, skip);
    }
};
