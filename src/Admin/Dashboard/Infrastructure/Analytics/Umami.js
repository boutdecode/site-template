const Request = require("../../../../Shared/Infrastructure/HTTP/Request");

module.exports = class Umami {
    constructor(url) {
        this.url = url;
        this.token = null;
    }

    async initToken(username, password) {
        const data = await Request.post(
            `${this.url}/api/auth/login`,
            JSON.stringify({ username, password }),
            { headers: { 'Content-Type': 'application/json' }}
        );

        const { token } = JSON.parse(data);

        this.token = token;
    }

    async getStats(websiteId) {
        const startAt = new Date();
        const endAt = new Date();

        startAt.setHours(0);
        startAt.setMinutes(0);
        startAt.setSeconds(0);
        startAt.setMilliseconds(0);

        endAt.setHours(23);
        endAt.setMinutes(59);
        endAt.setSeconds(59);
        endAt.setMilliseconds(999);

        const response = await Request.get(
            `${this.url}/api/websites/${websiteId}/stats?start_at=${startAt.getTime()}&end_at=${endAt.getTime()}`,
            { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${await this.token}` }}
        );

        return JSON.parse(response);
    }

    async getMetrics(websiteId, type) {
        const startAt = new Date();
        const endAt = new Date();

        startAt.setHours(0);
        startAt.setMinutes(0);
        startAt.setSeconds(0);
        startAt.setMilliseconds(0);

        endAt.setHours(23);
        endAt.setMinutes(59);
        endAt.setSeconds(59);
        endAt.setMilliseconds(999);

        const response = await Request.get(
            `${this.url}/api/websites/${websiteId}/metrics?type=${type}&start_at=${startAt.getTime()}&end_at=${endAt.getTime()}`,
            { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${await this.token}` }}
        );

        return JSON.parse(response);
    }

    async getAll(websiteId) {
        return {
            statsUrl: `${this.url}/websites/${websiteId}`,
            stats: await this.getStats(websiteId),
            urls: await this.getMetrics(websiteId, 'url'),
            referrers: await this.getMetrics(websiteId, 'referrer'),
            devices: await this.getMetrics(websiteId, 'device'),
            countries: await this.getMetrics(websiteId, 'country'),
        }
    }
}
