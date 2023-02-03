const Action = require("../../../../Shared/UI/Action");

module.exports = class NewsAction extends Action {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run();

            res.render('front/pages/news', data);
        } catch (e) {
            res.redirect(req.path('404'), 302);
        }
    }
}
