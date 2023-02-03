const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class ReadSettingsGateway extends Gateway {
    constructor(repository) {
        super('admin.settings.read');
        this.repository = repository;
    }

    async process() {
        const result = {};
        for (const { code, value } of await this.repository.find({}, 1000)) {
            result[code] = value;
        }

        return result;
    }
}
