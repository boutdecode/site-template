module.exports = class Gateway {
    constructor(name) {
        this.name = name;
    }

    process() {}

    async run(request) {
        try {
            console.log(`${this.name}`, request);
            const data = await this.process(request);
            console.log(`${this.name}.success`, request);

            return { data };
        } catch (error) {
            console.error(`${this.name}.error`, request, error.message);
            console.error(error);

            throw new Error(error.message);
        }
    }
}
