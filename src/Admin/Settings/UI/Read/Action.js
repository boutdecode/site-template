const AdminAction = require("../../../../Shared/UI/AdminAction");
const ReadSchema = require('../Schema/Edit');

module.exports = class ReadSettingsAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const { data } = await this.gateway.run();
        const form = new ReadSchema(data);

        res.render('admin/settings/index', { form: form.createView() });
    }
}
