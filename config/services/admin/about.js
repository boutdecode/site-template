const ReadAboutGateway = require("../../../src/Admin/About/Application/Read/Gateway");
const ReadAboutAction = require("../../../src/UI/Admin/About/Read/Action");

module.exports = (container) => {
    container.set(ReadAboutGateway, (container, { application }) => {
        return new ReadAboutGateway(
            application.version,
            container.resolvePath(application.changelog),
            application.bugs
        )
    });

    container.set(ReadAboutAction, (container) => {
        return new ReadAboutAction(
            container.get('session'),
            container.get(ReadAboutGateway)
        )
    });
};
