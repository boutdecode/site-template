const BrowsePageAction = require("../../src/Admin/Page/UI/Browse/Action");
const CreatePageAction = require("../../src/Admin/Page/UI/Create/Action");
const ReadPageAction = require("../../src/Admin/Page/UI/Read/Action");
const ShowPageAction = require("../../src/Admin/Page/UI/Show/Action");
const DeletePageAction = require("../../src/Admin/Page/UI/Delete/Action");
const EditPageAction = require("../../src/Admin/Page/UI/Edit/Action");

const HomeAction = require("../../src/Front/Page/UI/Home/Action");
const AboutAction = require("../../src/Front/Page/UI/About/Action");
const ContactAction = require("../../src/Front/Page/UI/Contact/Action");
const FrontReadPageAction = require("../../src/Front/Page/UI/Read/Action");

module.exports = (router) => {
    router.get('admin_page_browse', '/admin/:locale/pages', BrowsePageAction);
    router.get('admin_page_create', '/admin/:locale/page/create', CreatePageAction);
    router.get('admin_page_read', '/admin/:locale/page/:id/read', ReadPageAction);
    router.get('admin_page_show', '/admin/:locale/page/:id/show', ShowPageAction);
    router.post('admin_page_create', '/admin/page/create', CreatePageAction);
    router.post('admin_page_delete', '/admin/page/:id/delete', DeletePageAction);
    router.post('admin_page_edit', '/admin/page/:id/edit', EditPageAction);

    router.get('home', '/:locale/accueil', HomeAction);
    router.get('about', '/:locale/a-propos', AboutAction);
    router.get('contact', '/:locale/contact', ContactAction);
    router.get('front_page_read', '/:locale/page/:slug', FrontReadPageAction);
};
