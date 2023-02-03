const Command = require("../../../../../Shared/UI/Command");

module.exports = class CreateUserCommand extends Command {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    get name() {
        return 'app:admin:create';
    }

    get description() {
        return 'Create new administrator.';
    }

    get configuration() {
        return {
            args: {
                username: {
                    type: 'string',
                    description: 'Administrator username'
                },
                password: {
                    type: 'string',
                    description: 'Administrator password'
                }
            }
        }
    }

    async process({ username, password }) {
        try {
            await this.gateway.run({ username, password, activated: true });

            console.log(`Administrator ${username} created !`);
        } catch (e) {
            console.error(e);
        }
    }
}
