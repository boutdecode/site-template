
module.exports = {
    type: 'i18n',
    handle: (req, res, app, next) => {
        req.attributes.localeFallback = process.env.LOCALE;
        req.attributes.locale = req.headers['accept-language'] || process.env.LOCALE;

        const match = req.url.match(/\/([a-z]{2}(?:-[a-z]{2})?)\/.*/);
        if (match) {
            req.attributes.locale = match[1];
        }

        next();
    }
};
