module.exports = (app) => {
    const router = app.container.get('router');

    router.get('admin_redirect', '/admin', (req, res) => res.redirect(req.path('admin_login')));

    router.get('admin_login', '/admin/:locale/sign-in', 'admin_action_login');
    router.post('admin_sign_in', '/admin/:locale/sign-in', 'admin_action_login');
    router.get('admin_logout', '/admin/logout', 'admin_action_logout');

    router.get('admin_dashboard', '/admin/:locale/dashboard', 'admin_action_dashboard');
    router.get('admin_users', '/admin/:locale/users', 'admin_action_user_browse');
    router.get('admin_create_user', '/admin/:locale/user/create', 'admin_action_user_create');
    router.get('admin_read_user', '/admin/:locale/user/:id/read', 'admin_action_user_read');

    router.post('admin_create_user', '/admin/user/create', 'admin_action_user_create');
    router.post('admin_delete_user', '/admin/user/:id/delete', 'admin_action_user_delete');
    router.post('admin_edit_user', '/admin/user/:id/edit', 'admin_action_user_edit');
};
