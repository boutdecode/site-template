const zlib = require('zlib');
const fs = require("fs");

const hasAcceptedEncoding = (req, res) => {
    const encoding = res.original.getHeader('content-encoding');
    const acceptedEncoding = (req.headers['accept-encoding'] || '').split(', ');
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

        res.sendFile = function (filepath, filename, mimetype = 'text/plain', attachment = true) {
            if (fs.existsSync(filepath)) {
                const fileStat = fs.statSync(filepath);
                res.set('Content-Type', mimetype);

                if (0 !== fileStat.size) {
                    res.set('Content-Length', fileStat.size);
                }

                if (attachment) {
                    res.set('Content-Disposition', `attachment; filename=${encodeURIComponent(filename)}`);
                }

                const acceptedEncoding = hasAcceptedEncoding(req, res);
                if ('gzip' === acceptedEncoding) {
                    zlib.gzip(fs.readFileSync(filepath), (err, data) => {
                        res.set('Content-Length', data.length);
                        res.original.end(data);
                    });
                } else {
                    res.original.removeHeader('content-encoding');

                    const readStream = fs.createReadStream(filepath);
                    readStream.on('data', data => res.write(data));
                    readStream.on('end', () => res.original.end());
                }
            } else {
                throw new Error(`File ${filepath} doesn't exists.`);
            }
        }

        next();
    }
};
