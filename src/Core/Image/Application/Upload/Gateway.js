const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class UploadImageGateway extends Gateway {

    constructor(uploader) {
        super('admin.image.upload');
        this.uploader = uploader;
    }

    process({ filepath, options = {}, resize = {} }) {
        return this.uploader.upload(filepath, options, resize);
    }
}
