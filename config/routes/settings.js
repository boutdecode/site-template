const ReadSettingsAction = require("../../src/Admin/Settings/UI/Read/Action");
const EditSettingsAction = require("../../src/Admin/Settings/UI/Edit/Action");

module.exports = (router) => {
    router.get('admin_settings_read', '/admin/:locale/settings', ReadSettingsAction);
    router.post('admin_settings_edit', '/admin/:locale/settings', EditSettingsAction);
};
