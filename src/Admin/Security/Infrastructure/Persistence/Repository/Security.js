const CRUDRepository = require("../../../../../Shared/Infrastructure/Persistence/Repository/CRUD");
const { createHash } = require('crypto');

module.exports = class SecurityRepository extends CRUDRepository {
    constructor(requester, secret) {
        super(requester, 'user');
        this.secret = secret;
    }

    hashPassword(password) {
        return createHash('sha256')
            .update(password + this.secret)
            .digest('hex');
    }

    async findOne(username) {
        return await super.findOne({ username });
    }

    async findOneByPassword(username, password) {
        return await super.findOne({
            username,
            password: this.hashPassword(password),
            activated: true,
        });
    }
};
