const AdminAction = require("../../../Shared/UI/AdminAction");

module.exports = class Dashboard extends AdminAction {
    process(req, res) {
        res.render('admin/dashboard');
    }
}
