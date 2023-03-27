const SettingsRepository = require("../../src/Admin/Settings/Infrastructure/Repository/Settings");
const EditSettingsGateway = require("../../src/Admin/Settings/Application/Edit/Gateway");
const ReadSettingsGateway = require("../../src/Admin/Settings/Application/Read/Gateway");
const EditSettingsAction = require("../../src/Admin/Settings/UI/Edit/Action");
const ReadSettingsAction = require("../../src/Admin/Settings/UI/Read/Action");

module.exports = (container) => {
    container.set(SettingsRepository, ct => new SettingsRepository(ct.get('db')));

    container.set(EditSettingsGateway, ct => new EditSettingsGateway(ct.get(SettingsRepository)));
    container.set(ReadSettingsGateway, ct => new ReadSettingsGateway(ct.get(SettingsRepository)));

    container.set(EditSettingsAction, ct => new EditSettingsAction(ct.get('session'), ct.get(EditSettingsGateway)));
    container.set(ReadSettingsAction, ct => new ReadSettingsAction(ct.get('session'), ct.get(ReadSettingsGateway)));
};
