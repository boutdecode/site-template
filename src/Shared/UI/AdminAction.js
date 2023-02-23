const Action = require("./Action");

module.exports = class AdminAction extends Action {
    constructor(session) {
        super();
        this.session = session;
    }

    isAuthenticated(req) {
        const userSession = this.session.getSession(req);

        return !!userSession.user;
    }

    run(req, res, app, next) {
        if (!this.isAuthenticated(req)) {
            return res.redirect(req.path('admin_login'), 302);
        }

        super.run(req, res, app, next);
    }
}
