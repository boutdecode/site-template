module.exports = function (Encore) {
    Encore
        // directory where compiled assets will be stored
        .setOutputPath('dist/admin')
        // public path used by the web server to access the output path
        .setPublicPath('/assets/admin')
        .setManifestKeyPrefix('assets')

        .addEntry('common', './assets/common')
        .addEntry('admin', './assets/admin')

        .copyFiles([
            { from: './node_modules/tinymce/skins', to: 'skins/[path][name].[ext]' },
        ])

        // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
        //.splitEntryChunks()
        .enableSingleRuntimeChunk()
        .cleanupOutputBeforeBuild()
        .enableSourceMaps(!Encore.isProduction())
        .enableVersioning(Encore.isProduction())
        .enableSassLoader()
        .enableVueLoader()
    ;

    return Encore.getWebpackConfig();
}
