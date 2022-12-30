module.exports = (app) => {
    const router = app.container.get('router');

    router.get('home_redirect', '/', (req, res) => {
        res.set('Location', `/${req.attributes.locale}/accueil`);
        res.status(301);
        res.send();
    });

    router.get('home', '/:locale/accueil', 'front_action_page_home');
    router.get('about', '/:locale/a-propos', 'front_action_page_about');
    router.get('contact', '/:locale/contact', 'front_action_page_contact');

    router.get('front_page_read', '/:locale/page/:slug', 'front_action_page_read');
    router.get('404', '/404', 'front_action_error_404');
};
