require('dotenv').config();
require('intl');

const { createApp, createServer } = require("yion");
const bodyParser = require("yion-body-parser");

const services = require('./config/services');

const TemplateRendererPlugin = require('./src/Shared/Infrastructure/Plugin/TemplateRenderer');
const I18NPlugin = require('./src/Shared/Infrastructure/Plugin/I18N');
const SessionPlugin = require('./src/Shared/Infrastructure/Plugin/Session');
const RouterPlugin = require('./src/Shared/Infrastructure/Plugin/Router');
const FrontRouter = require('./src/UI/Front/Routes');
const AdminRouter = require('./src/UI/Admin/Routes');

const { NODE_PORT = 8080 } = process.env;
const app = createApp();
const httpServer = createServer(app, [
    SessionPlugin,
    TemplateRendererPlugin,
    I18NPlugin,
    RouterPlugin,
    bodyParser
]);

const cache = {
    'Cache-Control': 'public, max-age=' + (86400 * 30),
    'ETag': Date.now()
};

app.container = services();

app.use((req, res, next) => {
    if (req.headers['if-none-match'] && req.headers['if-none-match'] === cache['ETag']) {
        return res.status(304).send();
    }

    next();
});

app.link('/modules', `${__dirname}/node_modules`, cache);
app.link('/dist', `${__dirname}/dist`, cache);
app.link('/styles', `${__dirname}/dist/styles`, cache);
app.link('/static', `${__dirname}/dist/static`, cache);
app.link('/scripts', `${__dirname}/dist/scripts`, cache);
app.link('/images', `${__dirname}/dist/images`, cache);
app.link('/fonts', `${__dirname}/dist/fonts`, cache);
app.link('/assets', `${__dirname}/dist/assets`, cache);

FrontRouter(app);
AdminRouter(app);

app.container.get('router').handleApp(app);

httpServer.listen(NODE_PORT);
httpServer.on('listening', () => console.log(`🌏  Server start on port ${NODE_PORT}`));
