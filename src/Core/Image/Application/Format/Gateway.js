const fs = require('fs');
const path = require('path');
const HttpError = require("../../../../Shared/Infrastructure/HTTP/Error/HttpError");
const Gateway = require("../../../../Shared/Application/Gateway/Gateway");
const JpegFormater = require("../../../../Shared/Infrastructure/Image/Formater/Jpeg");
const WebpFormater = require("../../../../Shared/Infrastructure/Image/Formater/Webp");
const PngFormater = require("../../../../Shared/Infrastructure/Image/Formater/Png");

module.exports = class FormatImageGateway extends Gateway {
    constructor(uploadFolder) {
        super('admin.image.format');
        this.uploadFolder = uploadFolder;
    }

    async process({ filename, type, options = {}, resize = {} }) {
        if (!fs.existsSync(filename)) {
            throw new HttpError('Image not found', 404);
        }

        let newFilename = '';
        const pathname = `${this.uploadFolder}`;
        for (const key in resize) {
            newFilename += `${key.substring(0, 1)}${resize[key]}-`;

            if (!isNaN(resize[key])) {
                resize[key] = Number(resize[key]);
            }
        }

        newFilename += path.basename(filename).split('.')[0];
        newFilename += `.${type}`;
        if (fs.existsSync(`${pathname}/${newFilename}`)) {
            return `${pathname}/${newFilename}`;
        }

        if ('jpg' === type || 'jpeg' === type) {
            await JpegFormater.format(filename, `${pathname}/${newFilename}`, options, resize);
        } else if ('png' === type) {
            await PngFormater.format(filename, `${pathname}/${newFilename}`, options, resize);
        } else if ('webp' === type) {
            if ('.gif' === path.extname(filename)) {
                options.animated = true;
            }

            await WebpFormater.format(filename, `${pathname}/${newFilename}`, options, resize);
        }

        return `${pathname}/${newFilename}`;
    }
}
