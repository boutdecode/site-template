const ReadAboutGateway = require("../../src/Admin/About/Application/Read/Gateway");
const ReadAboutAction = require("../../src/Admin/About/UI/Read/Action");

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
