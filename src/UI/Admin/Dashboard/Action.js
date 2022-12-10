module.exports = (req, res) => {
    if (!req.session.user) {
        res.redirect(req.path('admin_login'), 302);
    }

    res.render('admin/dashboard');
};
