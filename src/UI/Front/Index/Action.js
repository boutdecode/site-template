const Action = require("../../../Shared/UI/Action");

module.exports = class Index extends Action {
    process(req, res) {
        res.render('front/index');
    }
}
