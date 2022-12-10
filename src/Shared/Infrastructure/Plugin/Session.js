const { randomUUID } = require('crypto');
const sessions = {};

const parseSessionCookie = (cookies) => {
    const matches = cookies.match(/session=([a-z0-9-].*)/);

    return matches[1];
};

module.exports = {
    type: 'session',
    handle: (req, res, app, next) => {
        let cookieId = randomUUID();

        if (req.headers.cookie) {
            cookieId = parseSessionCookie(req.headers.cookie);
        } else {
            res.set('Set-Cookie', `session=${cookieId}; maxAge=3600`)
        }

        if (!sessions[cookieId]) {
            sessions[cookieId] = {};
        }

        req.session = sessions[cookieId];

        next();
    }
};
