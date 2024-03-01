module.exports = ({ stores = [], provider = null, folder = 'data' } = {}) => {
  if (!provider) {
    throw new Error('No provider specified')
  }

  const store = provider({ stores, folder })
  return (context, next) => {
    context.set('store', store)

    next()
  }
}
