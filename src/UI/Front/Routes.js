module.exports = (app) => {
    const router = app.container.get('router');

    router.get('home_redirect', '/', (req, res) => {
        res.set('Location', `/${req.attributes.locale}/`);
        res.status(301);
        res.send();
    });

    router.get('home', '/:locale/', 'front_action_index');

    router.get('front_page_read', '/:locale/page/:slug', 'front_action_page_read');
};
