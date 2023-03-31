const crypto = require("crypto");
const path = require("path");
const ImageUploader = require("../../../Shared/Infrastructure/Image/Uploader/Uploader");
const WebpFormater = require("../../../Shared/Infrastructure/Image/Formater/Webp");

module.exports = class Uploader {
    constructor(imagesFolder) {
        this.imagesFolder = imagesFolder;
    }

    async upload(filepath, options = {}, resize = {}) {
        const newFilename = crypto
            .createHash('sha1')
            .update(path.basename(filepath))
            .digest('hex')
            .substring(0, 8);
        const ext = path.extname(filepath).toLowerCase();
        const newFilepath = `${this.imagesFolder}/${newFilename + ext}`;

        await ImageUploader.upload(filepath, newFilepath);

        if ('.gif' === ext) {
            options.animated = true;
        }

        return { webp: `${newFilename}.webp`, original: newFilename + ext };
    }
}
