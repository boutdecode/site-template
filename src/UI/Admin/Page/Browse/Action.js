const SearchSchema = require('./../Schema/Search');
const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class BrowseAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new SearchSchema();
        form.handleRequest(req);

        let parameters = {};
        if (form.isSubmit() && form.isValid()) {
            parameters = form.data;
        }

        const { data } = await this.gateway.run(parameters);

        return res.render('admin/pages/index', { items: data, form: form.createView() });
    }
}
