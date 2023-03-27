const Search = require('../Schema/Search');
const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class BrowseUserAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new Search();
        form.handleRequest(req);

        let parameters = {};
        if (form.isSubmit() && form.isValid()) {
            parameters = form.data;
        }

        const { data } = await this.gateway.run(parameters);

        return res.render('admin/users/index', { ...data, form: form.createView() });
    }
}
