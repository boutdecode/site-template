module.exports = class ObjectUtils {
    static isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    static deepMerge(target, source) {
        let output = Object.assign({}, target);
        if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (ObjectUtils.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = ObjectUtils.deepMerge(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
}
