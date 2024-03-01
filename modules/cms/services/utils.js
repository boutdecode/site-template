
module.exports = {
  slugify (text, separator = '-') {
    return text
      .toString()
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, separator)
      .replace(/[^\w\-]+/g, '')
      .replace(/\_/g, separator)
      .replace(/\-\-+/g, separator)
      .replace(/\-$/g, '')
  }
}
