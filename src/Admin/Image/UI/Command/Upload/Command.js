const fs = require('fs');
const Command = require("../../../../../Shared/UI/Command");

module.exports = class UploadImageCommand extends Command {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    get name() {
        return 'app:image:upload';
    }

    get description() {
        return 'Upload image.';
    }

    get configuration() {
        return {
            args: {
                filename: {
                    type: 'string',
                    description: 'Filename of image to upload'
                }
            }
        }
    }

    async process({ filename }) {
        const readStream = fs.createReadStream(filename);

        const data = [];
        readStream.on('data', (chunk) => {
            data.push(chunk);
        });

        readStream.on('end', async () => {
            const buffer = Buffer.concat(data);

            const newFilename = await this.gateway.run({ buffer, filename });

            console.log(`File ${newFilename.data} uploaded`);
        });
    }
}
