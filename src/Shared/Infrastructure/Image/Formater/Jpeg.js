const Formater = require("./Formater");
const sharp = require("sharp");
module.exports = class JpegFormater extends Formater {
    static format(source, target, options = {}, resize = {}) {
        return sharp(source, options).resize(resize).jpeg().toFile(target);
    }
}
