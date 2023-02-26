const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");

module.exports = class ACMERepository extends CRUDRepository {
    constructor(requester) {
        super(requester, 'acme');
    }

    async search(search = null, skip = 0, limit = 25) {
        const params = {};
        if (search) {
            params.slug = new RegExp(search, 'i');
        }

        return await super.find(params, limit, skip);
    }

    async searchCount(search) {
        const params = {};
        if (search) {
            params.slug = new RegExp(search, 'i');
        }

        return await super.count(params);
    }
};
