module.exports = class Action {
    process(req, res) {}

    run(req, res) {
        try {
            this.process(req, res);
        } catch(error) {
            res.send(`An error occurred: ${error}`);
        }
    }
}
