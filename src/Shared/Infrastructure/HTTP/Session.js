const { randomUUID } = require("crypto");

module.exports = class Session {
    constructor() {
        this.sessions = {};
        this.flashMessages = {};
    }

    /**
     * Get session from request
     * @param {object} req
     * @returns {{}|*}
     */
    getSession(req) {
        if (!req.sessionId || !this.sessions[req.sessionId]) {
            return {};
        }

        return this.sessions[req.sessionId];
    }

    /**
     * Start session for request
     * @param {object} req
     * @param {object} res
     * @param {object}  data
     * @param {boolean} [rememberMe=false]
     * @returns {*}
     */
    startSession(req, res, data, rememberMe = false) {
        req.sessionId = randomUUID();
        this.sessions[req.sessionId] = { ...data };

        if (rememberMe) {
            res.set('Set-Cookie', `session=${req.sessionId}; Max-Age=${24 * 60 * 60}; Path=/admin; SameSite=Strict; Secure; HttpOnly`);
        } else {
            res.set('Set-Cookie', `session=${req.sessionId}; Path=/admin; SameSite=Strict; Secure; HttpOnly`);
        }

        return this.sessions[req.sessionId];
    }

    /**
     * Destroy session
     * @param {object} req
     * @param {object} res
     */
    destroySession(req, res) {
        delete this.sessions[req.sessionId];

        res.set('Set-Cookie', `session=${req.sessionId}; Max-Age=-1`);
    }

    /**
     * Store messages into session
     * @param {string} message
     * @param {string} level
     */
    flash(message, level = 'info') {
        if (!this.flashMessages[level]) {
            this.flashMessages[level] = [];
        }

        this.flashMessages[level].push(message);
    }

    /**
     * Clear all flash messages
     */
    clearFlash() {
        this.flashMessages = {};
    }
}
