const CRUDRepository = require("../../../../Shared/Infrastructure/Persistence/Repository/CRUD");
const { createHash } = require("crypto");

module.exports = class UserRepository extends CRUDRepository {
    constructor(requester, secret) {
        super(requester, 'user');
        this.secret = secret;
    }

    hashPassword(password) {
        return createHash('sha256')
            .update(password + this.secret)
            .digest('hex');
    }

    async findByIdentifier(username) {
        return await super.findOne({ username });
    }

    async search(search = null, skip = 0, limit = 25) {
        const params = {};
        if (search) {
            params.username = new RegExp(search, 'i');
        }

        return await super.find(params, limit, skip);
    }

    async searchCount(search) {
        const params = {};
        if (search) {
            params.username = new RegExp(search, 'i');
        }

        return await super.count(params);
    }

    async create({ username, password, activated }) {
        return await super.create({
            username,
            password: this.hashPassword(password),
            activated
        });
    }

    async edit(id, { username, password, activated }) {
        const params = { username, activated };
        if (password) {
            params.password = this.hashPassword(password);
        }

        return await super.edit(id, params);
    }
};
