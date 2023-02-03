const ReadSettingsAction = require("./Read/Action");
const EditSettingsAction = require("./Edit/Action");

module.exports = (router) => {
    router.get('admin_settings_read', '/admin/:locale/settings', ReadSettingsAction);
    router.post('admin_settings_edit', '/admin/:locale/settings', EditSettingsAction);
};
