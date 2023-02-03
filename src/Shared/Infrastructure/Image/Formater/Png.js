const Formater = require("./Formater");
const sharp = require("sharp");
module.exports = class PngFormater extends Formater {
    static format(source, target, options = {}, resize = {}) {
        return sharp(source, options).resize(resize).png().toFile(target);
    }
}
