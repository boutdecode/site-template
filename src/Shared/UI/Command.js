module.exports = class Command {
    get name() {}
    get description() {}
    get configuration() {
        return {
            args: {},
            options: {},
        }
    }

    process(args) {}

    run(args) {
        const result = {};
        const configuration = this.configuration;

        let index = 0;
        for (const arg in configuration.args) {
            const { type } = configuration.args[arg];

            if (type === 'string') {
                result[arg] = String(args[index]);
            } else if (type === 'number') {
                result[arg] = Number(args[index]);
            } else if (type === 'boolean') {
                result[arg] = args[index] === '1' || args[index] === 'true';
            } else if (type === 'object') {
                result[arg] = JSON.parse(args[index]);
            }

            index++;
        }

        this.process(result);
    }
}
