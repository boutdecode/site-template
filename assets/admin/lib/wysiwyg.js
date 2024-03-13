import { plugin } from './wysiwyg/code-editor'

const conf = {
  plugins: ['image', 'link', 'lists', 'fullscreen', 'code', 'preview', 'template', 'importcss'],
  toolbar: [
    { name: 'history', items: ['undo', 'redo'] },
    { name: 'styles', items: ['styles'] },
    { name: 'formatting', items: ['bold', 'italic'] },
    { name: 'lists', items: ['numlist', 'bullist'] },
    { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'] },
    { name: 'indentation', items: ['outdent', 'indent'] },
    { name: 'insert', items: ['link', 'image'] },
    { name: 'tools', items: ['template', 'fullscreen', 'code', 'preview'] }
  ],
  setup (editor, other) {
    plugin()
  },
  content_css: '/build/main2.css',
  content_style: 'body { padding: 10px; overflow-x: hidden; } .row div { border: 1px dotted red; }',
  images_upload_url: '/admin/image',
  images_upload_credentials: true,
  templates: [
    {
      title: 'Deux colonnes 50-50',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-6"><p>Contenu 1</p></div>
            <div class="col-lg-6"><p>Contenu 2</p></div>
        </div>
        `
    },
    {
      title: 'Deux colonnes 33-66',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-4"><p>Contenu 1</p></div>
            <div class="col-lg-8"><p>Contenu 2</p></div>
        </div>
        `
    },
    {
      title: 'Deux colonnes 66-33',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-8"><p>Contenu 1</p></div>
            <div class="col-lg-4"><p>Contenu 2</p></div>
        </div>
        `
    },
    {
      title: 'Deux colonnes 25-75',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-3"><p>Contenu 1</p></div>
            <div class="col-lg-9"><p>Contenu 2</p></div>
        </div>
        `
    },
    {
      title: 'Deux colonnes 75-25',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-9"><p>Contenu 1</p></div>
            <div class="col-lg-3"><p>Contenu 2</p></div>
        </div>
        `
    },
    {
      title: 'Trois colonnes 33-33-33',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-4"><p>Contenu 1</p></div>
            <div class="col-lg-4"><p>Contenu 2</p></div>
            <div class="col-lg-4"><p>Contenu 3</p></div>
        </div>
        `
    },
    {
      title: 'Trois colonnes 50-25-25',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-6"><p>Contenu 1</p></div>
            <div class="col-lg-3"><p>Contenu 2</p></div>
            <div class="col-lg-3"><p>Contenu 3</p></div>
        </div>
        `
    },
    {
      title: 'Trois colonnes 25-50-25',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-3"><p>Contenu 1</p></div>
            <div class="col-lg-6"><p>Contenu 2</p></div>
            <div class="col-lg-3"><p>Contenu 3</p></div>
        </div>
        `
    },
    {
      title: 'Trois colonnes 25-25-50',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-3"><p>Contenu 1</p></div>
            <div class="col-lg-3"><p>Contenu 2</p></div>
            <div class="col-lg-6"><p>Contenu 3</p></div>
        </div>
        `
    },
    {
      title: 'Quatre colonnes',
      description: '',
      content: `
        <div class="row">
            <div class="col-lg-3"><p>Contenu 1</p></div>
            <div class="col-lg-3"><p>Contenu 2</p></div>
            <div class="col-lg-3"><p>Contenu 3</p></div>
            <div class="col-lg-3"><p>Contenu 4</p></div>
        </div>
        `
    }
  ]
}

export default conf
