const { createHash } = require('crypto');
const CRUDRepository = require("../../../../../Shared/Infrastructure/Persistence/Repository/CRUD");

module.exports = class SecurityRepository extends CRUDRepository {
    constructor(requester) {
        super(requester, 'user');
    }

    hashPassword(password) {
        return createHash('sha256').update(password).digest('hex');
    }

    async insert(username, password) {
        return await super.create({ username, password: this.hashPassword(password) });
    }

    async findOne(username) {
        return await super.findOne({ username });
    }

    async findOneByPassword(username, password) {
        return await super.findOne({
            username,
            password: this.hashPassword(password),
        });
    }
};
