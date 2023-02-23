const Gateway = require("../../../../Shared/Application/Gateway/Gateway");
const fs = require("fs");

module.exports = class ReadAboutGateway extends Gateway {

    constructor(version, changelog, bugs) {
        super('admin.about.read');

        this.version = version;
        this.changelog = changelog;
        this.bugs = bugs;
    }

    async process() {
        return {
            version: this.version,
            changelog: fs.readFileSync(this.changelog),
            bugs: this.bugs.url,
        };
    }
}
