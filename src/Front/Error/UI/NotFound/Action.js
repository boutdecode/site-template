const Action = require("../../../../Shared/UI/Action");

module.exports = class NotFoundPageAction extends Action {
    async process(req, res) {
        res.render('front/errors/not-found', { footerFixed: true });
    }
}
