const AdminAction = require("../../../Shared/UI/AdminAction");

module.exports = class Dashboard extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const { data } = await this.gateway.run();

        res.render('admin/dashboard', { users: data.users, pages: data.pages });
    }
}
