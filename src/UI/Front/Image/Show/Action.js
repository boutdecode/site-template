const path = require('path');
const Action = require("../../../../Shared/UI/Action");

module.exports = class ShowImageAction extends Action {

    constructor(gateway, uploadFolder, cache) {
        super();
        this.cache = cache;
        this.gateway = gateway;
        this.uploadFolder = uploadFolder;
    }

    async process(req, res) {
        try {
            const filename = req.params.filename.split('.');
            const { data } = await this.gateway.run({
                filename: path.resolve(this.uploadFolder, req.params.filename),
                type: req.query.type || filename[1],
                resize: req.query
            });

            for (const key in this.cache) {
                res.set(key, this.cache[key]);
            }

            res.sendFile(data, data, `image/${filename[1]}`, false);
        } catch (e) {
            res.status(404).send();
        }
    }
}
