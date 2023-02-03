const ImageUploader = require('../../../src/Core/Image/Model/Uploader');
const UploadImageGateway = require('../../../src/Core/Image/Application/Upload/Gateway');
const FormatImageGateway = require('../../../src/Core/Image/Application/Format/Gateway');
const UploadImageCommand = require('../../../src/UI/Command/Image/Upload/Command');
const FormatImageCommand = require('../../../src/UI/Command/Image/Format/Command');
const UploadImageAction = require('../../../src/UI/Admin/Image/Upload/Action');

module.exports = (container) => {
    container.set(ImageUploader, (container, { images }) => {
        return new ImageUploader(container.resolvePath(images.uploadFolder));
    });

    container.set(UploadImageGateway, (container) => {
        return new UploadImageGateway(container.get(ImageUploader));
    });

    container.set(FormatImageGateway, (container, { images }) => {
        return new FormatImageGateway(container.resolvePath(images.uploadFolder));
    });

    container.set(UploadImageCommand, (container) => {
        return new UploadImageCommand(
            container.get(UploadImageGateway)
        );
    });

    container.set(FormatImageCommand, (container) => {
        return new FormatImageCommand(
            container.get(FormatImageGateway)
        );
    });

    container.set(UploadImageAction, (container) => {
        return new UploadImageAction(
            container.get('session'),
            container.get(UploadImageGateway)
        );
    });
};
