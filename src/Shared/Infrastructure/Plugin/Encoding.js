const zlib = require('zlib');
const hasAcceptedEncoding = (req, res) => {
    const encoding = res.original.getHeader('content-encoding');
    const acceptedEncoding = (req.headers['accept-encoding'] || []).split(', ');
    if (acceptedEncoding.includes(encoding)) {
        return encoding;
    }

    return false;
};

module.exports = {
    type: 'encoding',
    handle: (req, res, app, next) => {
        res.send = function (data = null, encoding = 'utf-8') {
            const acceptedEncoding = hasAcceptedEncoding(req, res);
            if ('gzip' === acceptedEncoding) {
                zlib.gzip(data, (err, data) => {
                    res.set('Content-Length', data.length);
                    res.original.end(data);
                });
            } else {
                res.original.removeHeader('content-encoding');
                res.original.end(data, encoding);
            }
        };

        next();
    }
};
