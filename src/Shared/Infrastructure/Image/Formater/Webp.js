const Formater = require("./Formater");
const sharp = require("sharp");
module.exports = class WebpFormater extends Formater {
    static format(source, target, options = {}, resize = {}) {
        return sharp(source, options).resize(resize).toFile(target);
    }
}
