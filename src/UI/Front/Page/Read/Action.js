const Action = require("../../../../Shared/UI/Action");

module.exports = class ReadAction extends Action {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ slug: req.params.slug });

            res.render('front/pages/show', { data });
        } catch (e) {
            console.log(e)
            res.redirect(req.path('404'), 404);
        }
    }
}
