import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/models/dom";
import "tinymce/icons/default";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";

export default () => {
    document.querySelectorAll('.wysiwyg').forEach(target => {
        tinymce.init({
            target,
            plugins: ['image', 'link', 'lists'],
            toolbar: [
                { name: 'history', items: ['undo', 'redo'] },
                { name: 'styles', items: ['styles'] },
                { name: 'formatting', items: ['bold', 'italic'] },
                { name: 'lists', items: ['numlist', 'bullist'] },
                { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'] },
                { name: 'indentation', items: ['outdent', 'indent'] },
                { name: 'insert', items: ['link', 'image'] },
            ],
            setup: function (editor) {
                editor.on('change', () => {
                    if (target instanceof HTMLInputElement) {
                        target.value = editor.getContent();
                    } else {
                        target.textContent = editor.getContent();
                    }
                });
            }
        });
    });
};
