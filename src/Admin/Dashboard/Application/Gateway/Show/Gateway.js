const Gateway = require("../../../../../Shared/Application/Gateway/Gateway");

module.exports = class ShowGateway extends Gateway {
    constructor(userRepository, pageRepository) {
        super('admin.dashboard.show');
        this.userRepository = userRepository;
        this.pageRepository = pageRepository;
    }

    async process() {
        const users = await this.userRepository.count();
        const pages = await this.pageRepository.count();

        return { users, pages };
    }
}
