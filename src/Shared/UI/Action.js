module.exports = class Action {
    process(req, res, app, next) {}

    run(req, res, app, next) {
        try {
            this.process(req, res, app, next);
        } catch(error) {
            res.send(`An error occurred: ${error}`);
        }
    }
}
