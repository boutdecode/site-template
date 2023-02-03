const ShowImageAction = require("./Show/Action");

module.exports = (router) => {
    router.get('image', '/image/:filename', ShowImageAction);
};
