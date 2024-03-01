module.exports = ({ app }) => {
  app.get('/admin', ({ view }) => {
    console.log('LOL')
    view.render('admin/dashboard')
  })
}
