module.exports = ({ app }) => {
  app.get('/admin', ({ view }) => {
    view.render('admin/dashboard')
  })
}
