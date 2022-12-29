module.exports = class String {
    static slugify(text, separator = '-') {
        return text
            .toString()                                         // Cast to string (optional)
            .normalize('NFKD')                             // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
            .toLowerCase()                                      // Convert the string to lowercase letters
            .trim()                                             // Remove whitespace from both sides of a string (optional)
            .replace(/\s+/g, separator)         // Replace spaces with -
            .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
            .replace(/\_/g,separator)           // Replace _ with -
            .replace(/\-\-+/g, separator)       // Replace multiple - with single -
            .replace(/\-$/g, '');         // Remove trailing -
    }
}
