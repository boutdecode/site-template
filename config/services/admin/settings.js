const EditSettingsAction = require("../../../src/UI/Admin/Settings/Edit/Action");
const ReadSettingsAction = require("../../../src/UI/Admin/Settings/Read/Action");
const EditSettingsGateway = require("../../../src/Admin/Settings/Application/Edit/Gateway");
const ReadSettingsGateway = require("../../../src/Admin/Settings/Application/Read/Gateway");
const SettingsRepository = require("../../../src/Admin/Settings/Infrastructure/Repository/Settings");

module.exports = (container) => {
    container.set(SettingsRepository, () => {
        return new SettingsRepository(container.get('db'));
    });

    container.set(EditSettingsGateway, (container) => {
        return new EditSettingsGateway(container.get(SettingsRepository));
    });

    container.set(ReadSettingsGateway, (container) => {
        return new ReadSettingsGateway(container.get(SettingsRepository));
    });

    container.set(EditSettingsAction, (container) => {
        return new EditSettingsAction(
            container.get('session'),
            container.get(EditSettingsGateway)
        );
    });

    container.set(ReadSettingsAction, (container) => {
        return new ReadSettingsAction(
            container.get('session'),
            container.get(ReadSettingsGateway)
        );
    });
};
