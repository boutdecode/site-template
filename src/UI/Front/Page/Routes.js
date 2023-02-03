const HomeAction = require("./Home/Action");
const NewsAction = require("./News/Action");
const AboutAction = require("./About/Action");
const ContactAction = require("./Contact/Action");
const FrontReadPageAction = require("./Read/Action");

module.exports = (router) => {
    router.get('home', '/:locale/accueil', HomeAction);
    router.get('news', '/:locale/actualites', NewsAction);
    router.get('about', '/:locale/a-propos', AboutAction);
    router.get('contact', '/:locale/contact', ContactAction);
    router.get('front_page_read', '/:locale/page/:slug', FrontReadPageAction);
};
