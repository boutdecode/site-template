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
            const templateFolder = `${basePath}/../templates/admin/${context.toLowerCase()}`;
            const configFolder = `${basePath}/../config`;

            if (!fs.existsSync(adminFolder)){
                fs.mkdirSync(adminFolder);
            }

            if (!fs.existsSync(templateFolder)){
                fs.mkdirSync(templateFolder);
            }

            fs.cpSync(`${__dirname}/../Template/CRUD/Application`, `${adminFolder}/Application`, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/Infrastructure`, `${adminFolder}/Infrastructure`, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/UI`, `${adminFolder}/UI`, { recursive: true });
            fs.cpSync(`${__dirname}/../Template/CRUD/templates`, templateFolder, { recursive: true });
            fs.copyFileSync(`${__dirname}/../Template/CRUD/config/services.js`, `${configFolder}/services/${context.toLowerCase()}.js`);
            fs.copyFileSync(`${__dirname}/../Template/CRUD/config/routes.js`, `${configFolder}/routes/${context.toLowerCase()}.js`);
            fs.copyFileSync(`${__dirname}/../Template/CRUD/config/translation.js`, `${configFolder}/translation/${context.toLowerCase()}.js`);

            exec(`for i in ${adminFolder}/Application/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${adminFolder}/Infrastructure/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${adminFolder}/UI/**/*.js; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`for i in ${templateFolder}/*.pug; do
                sed -i 's/ACME/${context}/g' $i
                sed -i 's/acme/${context.toLowerCase()}/g' $i
            done`);

            exec(`sed -i 's/ACME/${context}/g' ${configFolder}/services/${context.toLowerCase()}.js`);
            exec(`sed -i 's/acme/${context.toLowerCase()}/g' ${configFolder}/services/${context.toLowerCase()}.js`);

            exec(`sed -i 's/ACME/${context}/g' ${configFolder}/routes/${context.toLowerCase()}.js`);
            exec(`sed -i 's/acme/${context.toLowerCase()}/g' ${configFolder}/routes/${context.toLowerCase()}.js`);

            console.log('DONE !');
            console.log("Don't forget to add db config.");
        } catch (e) {
            console.error(e);
        }
    }
}
