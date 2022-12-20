const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");

module.exports = class UserRepository extends CRUDRepository {
    async list(search = null, skip = 0, limit = 25) {
        const params = {};
        if (search) {
            params.username = new RegExp(search, 'i');
        }

        return await super.find(params, limit, skip);
    }
};
