const { insert, find, findOne, update, remove } = require('../../../src/shared/store/datastore')
const { slugify } = require("../services/utils");

module.exports = {
  async create({ slug, title, description, content, isFactory, activated }) {
    const slugResult = slugify(slug);
    const alreadyPage = await findOne('pages', { slug: slugResult });
    if (alreadyPage) {
      throw new Error(`Page with slug ${slugResult} already exists.`);
    }

    return insert('pages', { slug: slugResult, title, description, content, isFactory, activated });
  },

  async edit(id, { slug, title, description, content, activated }) {
    const slugResult = slugify(slug);
    const alreadyPage = await findOne({ slug: slugResult });
    if (alreadyPage && alreadyPage._id !== id) {
      throw new Error(`Page with slug ${slugResult} already exists.`);
    }

    return update('pages', { _id: id }, { $set: { slug: slugResult, title, description, content, activated } });
  },

  async remove(id) {
    return remove('pages', { _id: id });
  },

  async get(id) {
    const page = await findOne('pages', { _id: id });
    if (!page) {
      throw new Error('Page not found.');
    }

    return page;
  },

  async findBySlug(slug) {
    return findOne('pages', { slug });
  },

  async browse() {
    return find('pages');
  },
}
