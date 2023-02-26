const { exec } = require('child_process');
const fs = require('fs');
const Command = require("../../Command");

module.exports = class CRUDCommand extends Command {
    get name() {
        return 'app:maker:crud';
    }

    get description() {
        return 'Create new CRUD.';
    }

    get configuration() {
        return {
            args: {
                context: {
                    type: 'string',
                    description: 'Context for CRUD'
                }
            }
        }
    }

    async process({ context }) {
        try {
            const basePath = `${__dirname}/../../../..`;
            const adminFolder = `${basePath}/Admin/${context}`;
            const coreFolder = `${basePath}/Core/${context}`;
            const uiFolder = `${basePath}/UI/Admin/${context}`;
            const templateFolder = `${basePath}/../templates/admin/${context.toLowerCase()}`;
            const configFolder = `${basePath}/../config`;

            if (!fs.existsSync(adminFolder)){
                fs.mkdirSync(adminFolder);
            }

            if (!fs.existsSync(coreFolder)){
                fs.mkdirSync(coreFolder);
            }

            if (!fs.existsSync(uiFolder)){
                fs.mkdirSync(uiFolder);
            }

            if (!fs.existsSync(templateFolder)){
                fs.mkdirSync(templateFolder);
            }

            fs.cpSync(`${__dirname}/../Template/CRUD/Application`, `${adminFolder}/Application`, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/Infrastructure`, `${coreFolder}/Infrastructure`, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/UI`, uiFolder, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/templates`, templateFolder, { recursive: true });
            fs.copyFileSync(`${__dirname}/../Template/CRUD/config/services.js`, `${configFolder}/services/admin/${context.toLowerCase()}.js`);

            exec(`for i in ${adminFolder}/Application/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${coreFolder}/Infrastructure/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${uiFolder}/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${templateFolder}/*.pug; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`sed -i 's/ACME/${context}/g' ${uiFolder}/Routes.js`);
            exec(`sed -i 's/acme/${context.toLowerCase()}/g' ${uiFolder}/Routes.js`);

            exec(`sed -i 's/ACME/${context}/g' ${configFolder}/services/admin/${context.toLowerCase()}.js`);
            exec(`sed -i 's/acme/${context.toLowerCase()}/g' ${configFolder}/services/admin/${context.toLowerCase()}.js`);

            console.log('DONE !');
            console.log("Don't forget to add db config, include service and routes.");
        } catch (e) {
            console.error(e);
        }
    }
}
