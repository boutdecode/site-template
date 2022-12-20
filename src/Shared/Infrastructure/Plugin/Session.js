const { randomUUID } = require('crypto');

const parseSessionCookie = (cookies) => {
    const matches = cookies.match(/session=([a-z0-9-]+)/);

    return matches[1];
};

module.exports = {
    type: 'session',
    handle: (req, res, app, next) => {
        if (req.uri.match(/^\/admin/) && req.headers.cookie) {
            req.sessionId = parseSessionCookie(req.headers.cookie);
        }

        next();
    }
};
