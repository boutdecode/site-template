const TranslatableSchema = require("../../../../Shared/Infrastructure/Schema/TranslatableSchema");

module.exports = class CreateSchema extends TranslatableSchema {
    get schema() {
        return {
            slug: {
                _type: 'string',
                _required: true,
                _label: 'form.label.slug',
                _options: { help: 'slug_explanation' }
            },
            title: {
                _type: 'object',
                _require: true,
                _parameters: this.translatableInputs(),
                _label: 'form.label.title',
            },
            shortDescription: {
                _type: 'object',
                _require: true,
                _parameters: this.translatableInputs('textarea', true, { attr: { maxlength: 200 } }),
                _label: 'form.label.short_description',
            },
            content: {
                _type: 'object',
                _require: true,
                _parameters: this.translatableInputs('textarea', true, { className: { input: 'wysiwyg' } }),
                _label: 'form.label.content',
            },
            activated: {
                _type: 'boolean',
                _default: false,
                _label: 'form.label.published',
                _options: {
                    help: 'is_published_resource'
                }
            },
            isFactory: {
                _type: 'boolean',
                _default: false,
                _label: 'form.label.is_factory',
                _options: {
                    help: 'is_factory_resource'
                }
            }
        }
    }
}
