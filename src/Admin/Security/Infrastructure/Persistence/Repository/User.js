const { pbkdf2Sync } = require('crypto');
const boxstore = require('boxstore');

module.exports = {
    hashPassword(password) {
        return pbkdf2Sync(password, process.env.SECURITY_SALT, 1000, 64, 'sha512');
    },

    async insert(username, password) {
        await boxstore.get('db').query({
            collection: 'users',
            type: 'insert',
            params: {
                username,
                password: this.hashPassword(password)
            }
        });
    },

    async findOne(username) {
        const { result } = await boxstore.get('db').query({
            collection: 'users',
            type: 'findOne',
            params: { username },
        });

        return result;
    },

    async findOneByPassword(username, password) {
        const { result } = await boxstore.get('db').query({
            collection: 'users',
            type: 'findOne',
            params: {
                username,
                password: this.hashPassword(password),
            }
        });

        return result;
    }
};
