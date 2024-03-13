import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { indentWithTab } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import { html } from '@codemirror/lang-html'

let codeEditor = null
const setContent = (editor) => {
  editor.focus()
  editor.undoManager.transact(() => {
    editor.setContent(codeEditor.state.doc.toString())
  })
  editor.selection.setCursorLocation()
  editor.nodeChanged()
}
const getContent = editor => {
  return editor.getContent({ source_view: true })
}

const open = editor => {
  const editorContent = getContent(editor)
  editor.windowManager.open({
    title: 'Source Code',
    size: 'large',
    body: {
      type: 'panel',
      items: [{
        type: 'htmlpanel',
        html: `
          <style>
            #code-editor {
              position: relative;
              width: 100%;
              height: 500px;
            }
          </style>
          <div id="code-editor"></div>
        `
      }]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    onSubmit: api => {
      setContent(editor, api.getData().code)
      api.close()
    }
  })

  codeEditor = new EditorView({
    state: EditorState.create({
      extensions: [basicSetup, keymap.of([indentWithTab]), html()],
      doc: editorContent
    }),
    parent: document.querySelector('#code-editor')
  })
}

const register$1 = editor => {
  editor.addCommand('mceCodeEditor', () => {
    open(editor)
  })
}

const register = editor => {
  const onAction = () => editor.execCommand('mceCodeEditor')
  editor.ui.registry.addButton('code', {
    icon: 'sourcecode',
    tooltip: 'Source code',
    onAction
  })
  editor.ui.registry.addMenuItem('code', {
    icon: 'sourcecode',
    text: 'Source code',
    onAction
  })
}

export const plugin = () => {
  // eslint-disable-next-line no-undef
  const global = tinymce.util.Tools.resolve('tinymce.PluginManager')

  global.add('code', editor => {
    register$1(editor)
    register(editor)
    return {}
  })
}
