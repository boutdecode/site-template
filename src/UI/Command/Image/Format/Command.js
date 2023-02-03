const path = require('path');
const Command = require("../../../../Shared/UI/Command");

module.exports = class FormatImageCommand extends Command {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    get name() {
        return 'app:image:format';
    }

    get description() {
        return 'Format image.';
    }

    get configuration() {
        return {
            args: {
                filename: {
                    type: 'string',
                    description: 'Filename of image to format'
                },
                type: {
                    type: 'string',
                    description: 'Type of image format, jpg, png or webpack'
                },
                resize: {
                    type: 'object',
                    description: 'Options to resize image'
                }
            }
        }
    }

    async process({ filename, type, resize = {} }) {
        await this.gateway.run({
            filename: path.resolve(`${__dirname}/../../../../../../`, filename),
            type,
            resize
        });
    }
}
