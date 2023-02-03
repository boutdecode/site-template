const HttpError = require('../../HTTP/Error/HttpError');

module.exports = class CRUDRepository {
    constructor(requester, collection) {
        this.requester = requester;
        this.collection = collection;
    }

    /**
     * Get resource by id
     * @param {*} id
     * @returns {Promise<*>}
     */
    async get(id) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'findOne',
            params: { _id: id },
        });

        if (!query.result) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }

    /**
     * Find limited resources with parameters
     * @param {object} params
     * @param {number} [limit=10]
     * @param {number} [skip=0]
     * @returns {Promise<*>}
     */
    async find(params = {}, limit = 10, skip = 0) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'find',
            params,
            limit,
            skip,
            sort: { updatedAt: -1, createdAt: -1 }
        });

        return query.result;
    }

    /**
     * Find one resource by parameters
     * @param {object} params
     * @returns {Promise<*>}
     */
    async findOne(params = {}) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'findOne',
            params,
        });

        return query.result;
    }

    /**
     * Count resource by parameters
     * @param {object} params
     * @returns {Promise<*>}
     */
    async count(params) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'count',
            params,
        });

        return query.result;
    }

    /**
     * Create new resource with data
     * @param {object} data
     * @returns {Promise<*>}
     */
    async create(data) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'insert',
            params: data,
        });

        return query.result;
    }

    /**
     * Edit resource by id
     * @param {*} id
     * @param {object} data
     * @returns {Promise<*>}
     */
    async edit(id, data) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'update',
            selector: { _id: id },
            params: { $set: data },
        });

        if (query.result === 0) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }

    /**
     * Remove resource with id
     * @param {*} id
     * @returns {Promise<*>}
     */
    async remove(id) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'remove',
            selector: { _id: id },
        });

        if (query.result === 0) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }
}
