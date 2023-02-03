const fs = require('fs');
module.exports = class Uploader {
    static upload(filepath, to) {
        return new Promise((resolve, reject) => {
            fs.copyFile(filepath, to, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        })
    }
}
