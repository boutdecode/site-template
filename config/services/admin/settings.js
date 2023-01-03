const EditSettingsAction = require("../../../src/UI/Admin/Settings/Edit/Action");
const ReadSettingsAction = require("../../../src/UI/Admin/Settings/Read/Action");
const EditSettingsGateway = require("../../../src/Admin/Settings/Application/Gateway/Edit/Gateway");
const ReadSettingsGateway = require("../../../src/Admin/Settings/Application/Gateway/Read/Gateway");
const SettingsRepository = require("../../../src/Admin/Settings/Infrastructure/Repository/Settings");

module.exports = (container) => {
    container.set('settings_repository', () => {
        return new SettingsRepository(container.get('db'));
    });

    container.set('admin_gateway_settings_edit', (container) => {
        return new EditSettingsGateway(container.get('settings_repository'));
    });

    container.set('admin_gateway_settings_read', (container) => {
        return new ReadSettingsGateway(container.get('settings_repository'));
    });

    container.set('admin_action_settings_edit', (container) => {
        return new EditSettingsAction(
            container.get('session'),
            container.get('admin_gateway_settings_edit')
        );
    });

    container.set('admin_action_settings_read', (container) => {
        return new ReadSettingsAction(
            container.get('session'),
            container.get('admin_gateway_settings_read')
        );
    });
};
