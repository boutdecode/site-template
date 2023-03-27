const Schema = require("../../../../Shared/Infrastructure/Schema/Schema");

module.exports = class UploadSchema extends Schema {
    get schema() {
        return {
            file: {
                _type: 'file',
                _required: true,
                _label: 'form.label.file'
            }
        }
    }
}
