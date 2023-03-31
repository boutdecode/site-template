const ImageUploader = require("../../src/Core/Image/Model/Uploader");
const UploadImageGateway = require("../../src/Core/Image/Application/Upload/Gateway");
const FormatImageGateway = require("../../src/Core/Image/Application/Format/Gateway");
const UploadImageCommand = require("../../src/Admin/Image/UI/Command/Upload/Command");
const FormatImageCommand = require("../../src/Admin/Image/UI/Command/Format/Command");
const UploadImageAction = require("../../src/Admin/Image/UI/Upload/Action");
const ShowImageAction = require("../../src/Front/Image/UI/Show/Action");

module.exports = (container) => {
    container.set(ImageUploader, (ct, { images }) => new ImageUploader(ct.resolvePath(images.uploadFolder)));

    container.set(UploadImageGateway, ct => new UploadImageGateway(ct.get(ImageUploader)));
    container.set(FormatImageGateway, (ct, { images }) => new FormatImageGateway(ct.resolvePath(images.cacheFolder)));

    container.set(UploadImageCommand, ct => new UploadImageCommand(ct.get(UploadImageGateway)));
    container.set(FormatImageCommand, ct => new FormatImageCommand(ct.get(FormatImageGateway)));

    container.set(UploadImageAction, ct => new UploadImageAction(ct.get('session'), ct.get(UploadImageGateway)));

    container.set(ShowImageAction, (container, { images, cache }) => {
        return new ShowImageAction(
            container.get(FormatImageGateway),
            container.resolvePath(images.uploadFolder),
            cache
        );
    });
};
