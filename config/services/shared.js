const CRUDCommand = require("../../src/Shared/UI/Maker/Command/CRUD");

module.exports = (container) => {
    container.set(CRUDCommand, () => {
        return new CRUDCommand();
    });
};
