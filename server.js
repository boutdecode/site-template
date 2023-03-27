require('intl');

const { createApp, createServer } = require("yion");
const bodyParser = require("yion-body-parser");

const EncodingPlugin = require('./src/Shared/Infrastructure/Yion/Plugin/Encoding');
const TemplateRendererPlugin = require('./src/Shared/Infrastructure/Yion/Plugin/TemplateRenderer');
const I18NPlugin = require('./src/Shared/Infrastructure/Yion/Plugin/I18N');
const SessionPlugin = require('./src/Shared/Infrastructure/Yion/Plugin/Session');
const RouterPlugin = require('./src/Shared/Infrastructure/Yion/Plugin/Router');
const Kernel = require("./src/Shared/Infrastructure/Yion/Kernel");

const { NODE_PORT = 8080 } = process.env;
const app = createApp();
const httpServer = createServer(app, [
    EncodingPlugin,
    SessionPlugin,
    TemplateRendererPlugin,
    I18NPlugin,
    RouterPlugin,
    bodyParser
]);

const kernel = new Kernel(app);
kernel.init();

httpServer
    .listen(NODE_PORT)
    .on('listening', () => console.log(`🌏  Server start on port ${NODE_PORT}`));
