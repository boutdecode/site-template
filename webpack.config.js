const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

const frontConfig = require('./assets/front/webpack.config')(Encore);
Encore.reset();
const adminConfig = require('./assets/admin/webpack.config')(Encore);

module.exports = [frontConfig, adminConfig];
