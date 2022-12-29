module.exports = function (Encore) {
    Encore
        // directory where compiled assets will be stored
        .setOutputPath('dist/front')
        // public path used by the web server to access the output path
        .setPublicPath('/assets/front')
        .setManifestKeyPrefix('assets')

        .addEntry('common', './assets/common')
        .addEntry('front', './assets/front')

        // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
        //.splitEntryChunks()
        .enableSingleRuntimeChunk()
        .cleanupOutputBeforeBuild()
        .enableSourceMaps(!Encore.isProduction())
        .enableVersioning(Encore.isProduction())
        .enableSassLoader()
    ;

    return Encore.getWebpackConfig();
}
