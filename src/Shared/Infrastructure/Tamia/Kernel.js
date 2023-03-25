const tamiaApi = require("@tamia-web/tamia/src/middlewares/api");
const docPlugin = require("@tamia-web/doc-plugin");
const { send } = require("@tamia-web/tamia/modules/common/services/controller");
const Gateway = require("../../Application/Gateway/Gateway");

module.exports = class Kernel {
    constructor(container, apiDescription, routes, models) {
        this.container = container;
        this.operators = [];
        this.config = {
            ...apiDescription,
            components: this.generateComponents(models),
            paths: this.generatePaths(routes),
        };
    }
    generatePaths(routes) {
        if (!Array.isArray(routes)) {
            throw new Error(`Routes as to be an array, ${typeof routes} instead`);
        }

        const paths = {};
        for (let { name, path, method, operator, input, output } of routes) {
            if (!name || !path || !method || !operator) {
                throw new Error('Route as to be an object with name, path, method and operator parameters');
            }

            if (!paths[path]) {
                paths[path] = {};
            }

            const operationId = `${method}${name}`;
            paths[path][method.toLowerCase()] = {
                operationId: operationId,
                parameters: input,
                responses: output
            };

            this.operators.push({ event: operationId, operator: this.container.get(operator, operator) });
        }

        return paths;
    }

    generateComponents(models) {
        return {};
    }

    handleApp(app) {
        const api = tamiaApi(this.config, [], [docPlugin('')]);
        for (const { event, operator } of this.operators) {
            api.on(event, async (req, res) => {
                try {
                    if (operator instanceof Gateway) {
                        const data = await operator.run({ ...req.params, ...req.query, ...req.body });

                        return send(req, res, data);
                    }

                    await operator(req, res, app);
                } catch (e) {
                    console.error(e);
                    send(req, res, e.message, e.code || 500);
                }
            });
        }

        app.use((req, res, next) => {
            req.original.body = req.body;
            req.original.params = req.params;
            req.original.query = req.query;
            req.original.attributes = req.attributes;

            res.original.render = res.render;

            api.request(req.original, res.original, next);
        });

        return api;
    }
}
