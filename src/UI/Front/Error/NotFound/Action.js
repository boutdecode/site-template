const Action = require("../../../../Shared/UI/Action");

module.exports = class NotFound extends Action {
    async process(req, res) {
        res.render('front/errors/not-found');
    }
}
