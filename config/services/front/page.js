const FrontReadPageGateway = require("../../../src/Front/Page/Application/Read/Gateway");
const PageRepository = require("../../../src/Core/Page/Infrastructure/Repository/Page");
const FrontReadPageAction = require("../../../src/UI/Front/Page/Read/Action");

module.exports = (container) => {
    container.set(FrontReadPageGateway, (container) => {
        return new FrontReadPageGateway(container.get(PageRepository));
    });

    container.set(FrontReadPageAction, (container) => {
        return new FrontReadPageAction(
            container.get(FrontReadPageGateway)
        );
    });
};
