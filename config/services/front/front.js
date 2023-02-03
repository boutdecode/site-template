const FrontReadPageGateway = require("../../../src/Front/Page/Application/Read/Gateway");
const FrontError404Action = require("../../../src/UI/Front/Error/NotFound/Action");
const HomePageAction = require("../../../src/UI/Front/Page/Home/Action");
const AboutPageAction = require("../../../src/UI/Front/Page/About/Action");
const ContactPageAction = require("../../../src/UI/Front/Page/Contact/Action");
const ShowImageAction = require("../../../src/UI/Front/Image/Show/Action");
const FormatImageGateway = require("../../../src/Core/Image/Application/Format/Gateway");

module.exports = (container) => {
    container.set(FrontError404Action, () => {
        return new FrontError404Action();
    });

    container.set(HomePageAction, (container) => {
        return new HomePageAction(
            container.get(FrontReadPageGateway)
        );
    });

    container.set(AboutPageAction, (container) => {
        return new AboutPageAction(
            container.get(FrontReadPageGateway)
        );
    });

    container.set(ContactPageAction, (container) => {
        return new ContactPageAction(
            container.get(FrontReadPageGateway)
        );
    });

    container.set(ShowImageAction, (container, { images, cache }) => {
        return new ShowImageAction(
            container.get(FormatImageGateway),
            container.resolvePath(images.uploadFolder),
            cache
        );
    });
};
