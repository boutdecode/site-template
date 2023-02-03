const AdminAction = require("../../../../Shared/UI/AdminAction");
const UploadSchema = require("../Schema/Upload");

module.exports = class UploadImageAction extends AdminAction {

    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new UploadSchema();
        form.handleRequest(req);

        if (form.isSubmit() && form.isValid()) {
            try {
                const { file } = form.data;
                const { data } = await this.gateway.run({ filepath: file.filepath, resize: req.query });

                return res.json({ location: req.path('image', { filename: data.webp }) });
            } catch ({ message }) {
                return res.json({ error: message });
            }
        }

        return res.json({ errors: form.validation.errors });
    }
}
