const Action = require("../../../../Shared/UI/Action");

module.exports = class AboutAction extends Action {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ slug: 'a-propos' });

            res.render('front/pages/show', { data });
        } catch (e) {
            res.redirect(req.path('404'), 302);
        }
    }
}
