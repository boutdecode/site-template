const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");
const HttpError = require("../../../../Shared/Infrastructure/HTTP/Error/HttpError");

module.exports = class ConfigurationRepository extends CRUDRepository {
    constructor(requester) {
        super(requester, 'settings');
    }

    async edit(code, data) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'update',
            selector: { code },
            params: { $set: data },
        });

        if (query.result === 0) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }
};
