const ShowDashboardGateway = require("../../../src/Admin/Dashboard/Application/Show/Gateway");
const SettingsRepository = require("../../../src/Admin/Settings/Infrastructure/Repository/Settings");
const DashboardAction = require("../../../src/Admin/Dashboard/UI/Action");
const UserRepository = require("../../../src/Admin/User/Infrastructure/Repository/User");
const PageRepository = require("../../../src/Admin/Page/Infrastructure/Repository/Page");

module.exports = (container) => {
    container.set(ShowDashboardGateway, (container) => {
        return new ShowDashboardGateway(
            container.get(UserRepository),
            container.get(PageRepository),
            container.get(SettingsRepository),
            container.get('analytics')
        );
    });

    container.set(DashboardAction, (container) => {
        return new DashboardAction(
            container.get('session'),
            container.get(ShowDashboardGateway)
        );
    });
};
