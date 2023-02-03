const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class EditSettingsGateway extends Gateway {
    constructor(repository) {
        super('admin.settings.edit');
        this.repository = repository;
    }

    async process(data) {
        for (const code in data) {
            try {
                await this.repository.edit(code, { value: data[code] });
            } catch (e) {
                await this.repository.create({ code, value: data[code] });
            }
        }
    }
}
