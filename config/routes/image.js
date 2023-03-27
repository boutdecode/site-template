const UploadImageAction = require("../../src/Admin/Image/UI/Upload/Action");
const ShowImageAction = require("../../src/Front/Image/UI/Show/Action");

module.exports = (router) => {
    router.post('admin_image', '/admin/image', UploadImageAction);
    router.get('image', '/image/:filename', ShowImageAction);
};
