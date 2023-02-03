const Gateway = require("../../../../Shared/Application/Gateway/Gateway");

module.exports = class ShowSettingsGateway extends Gateway {
    calendarRepository;

    constructor(
        userRepository,
        pageRepository,
        settingRepository,
        analytics
    ) {
        super('admin.dashboard.show');

        this.userRepository = userRepository;
        this.pageRepository = pageRepository;
        this.settingRepository = settingRepository;
        this.analytics = analytics;
    }

    async process() {
        const users = await this.userRepository.count();
        const pages = await this.pageRepository.count();

        try {
            const username = await this.settingRepository.findByCode('analyticsUsername');
            const password = await this.settingRepository.findByCode('analyticsPassword');
            const websiteId = await this.settingRepository.findByCode('analyticsWebsiteId');

            await this.analytics.initToken(username.value, password.value);
            const stats = await this.analytics.getAll(websiteId.value);

            return { users, pages, ...stats };
        } catch (e) {
            return { users, pages };
        }
    }
}
