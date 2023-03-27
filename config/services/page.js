const PageRepository = require("../../src/Admin/Page/Infrastructure/Repository/Page");
const BrowsePageGateway = require("../../src/Admin/Page/Application/Browse/Gateway");
const CreatePageGateway = require("../../src/Admin/Page/Application/Create/Gateway");
const DeletePageGateway = require("../../src/Admin/Page/Application/Delete/Gateway");
const EditPageGateway = require("../../src/Admin/Page/Application/Edit/Gateway");
const ReadPageGateway = require("../../src/Admin/Page/Application/Read/Gateway");

const FrontReadPageGateway = require("../../src/Front/Page/Application/Read/Gateway");
const BrowsePageAction = require("../../src/Admin/Page/UI/Browse/Action");
const CreatePageAction = require("../../src/Admin/Page/UI/Create/Action");
const DeletePageAction = require("../../src/Admin/Page/UI/Delete/Action");
const EditPageAction = require("../../src/Admin/Page/UI/Edit/Action");
const ReadPageAction = require("../../src/Admin/Page/UI/Read/Action");
const ShowPageAction = require("../../src/Admin/Page/UI/Show/Action");
const FrontReadPageAction = require("../../src/Front/Page/UI/Read/Action");
const NotFoundPageAction = require("../../src/Front/Error/UI/NotFound/Action");
const HomePageAction = require("../../src/Front/Page/UI/Home/Action");
const AboutPageAction = require("../../src/Front/Page/UI/About/Action");
const ContactPageAction = require("../../src/Front/Page/UI/Contact/Action");

module.exports = (container) => {
    container.set(PageRepository, () => new PageRepository(container.get('db')));

    container.set(BrowsePageGateway, ct => new BrowsePageGateway(ct.get(PageRepository)));
    container.set(CreatePageGateway, ct => new CreatePageGateway(ct.get(PageRepository)));
    container.set(DeletePageGateway, ct => new DeletePageGateway(ct.get(PageRepository)));
    container.set(EditPageGateway, ct => new EditPageGateway(ct.get(PageRepository)));
    container.set(ReadPageGateway, ct => new ReadPageGateway(ct.get(PageRepository)));

    container.set(BrowsePageAction, ct => new BrowsePageAction(ct.get('session'), ct.get(BrowsePageGateway)));
    container.set(CreatePageAction, ct => new CreatePageAction(ct.get('session'), ct.get(CreatePageGateway)));
    container.set(DeletePageAction, ct => new DeletePageAction(ct.get('session'), ct.get(DeletePageGateway)));
    container.set(EditPageAction, ct => new EditPageAction(ct.get('session'), ct.get(EditPageGateway)));
    container.set(ReadPageAction, ct => new ReadPageAction(ct.get('session'), ct.get(ReadPageGateway)));
    container.set(ShowPageAction, ct => new ShowPageAction(ct.get('session'), ct.get(ReadPageGateway)));

    container.set(FrontReadPageGateway, ct => new FrontReadPageGateway(ct.get(PageRepository)));

    container.set(FrontReadPageAction, ct => new FrontReadPageAction(ct.get(FrontReadPageGateway)));
    container.set(NotFoundPageAction, () => new NotFoundPageAction());
    container.set(HomePageAction, ct => new HomePageAction(ct.get(FrontReadPageGateway)));
    container.set(AboutPageAction, ct => new AboutPageAction(ct.get(FrontReadPageGateway)));
    container.set(ContactPageAction, ct => new ContactPageAction(ct.get(FrontReadPageGateway)));
};
