const FrontReadPageGateway = require("../../../src/Front/Page/Application/Read/Gateway");
const FrontReadPageAction = require("../../../src/UI/Front/Page/Read/Action");
const FrontError404Action = require("../../../src/UI/Front/Error/NotFound/Action");
const HomePageAction = require("../../../src/UI/Front/Page/Home/Action");
const AboutPageAction = require("../../../src/UI/Front/Page/About/Action");
const ContactPageAction = require("../../../src/UI/Front/Page/Contact/Action");

module.exports = (container) => {
    container.set('front_gateway_page_read', (container) => {
        return new FrontReadPageGateway(container.get('page_repository'));
    });

    container.set('front_action_page_read', (container) => {
        return new FrontReadPageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_error_404', () => {
        return new FrontError404Action();
    });

    container.set('front_action_page_home', () => {
        return new HomePageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_page_about', () => {
        return new AboutPageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_page_contact', () => {
        return new ContactPageAction(
            container.get('front_gateway_page_read')
        );
    });
};
