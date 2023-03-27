const TranslatableSchema = require("../../../../Shared/Infrastructure/Schema/TranslatableSchema");

module.exports = class EditSchema extends TranslatableSchema {
    get schema() {
        return {
            websiteName: {
                _type: 'string',
                _required: true,
                _label: 'form.label.website_name',
            },
            websiteContact: {
                _type: 'string',
                _required: true,
                _label: 'form.label.website_contact',
            },
            metaAuthor: {
                _type: 'string',
                _required: true,
                _label: 'form.label.meta_author',
            },
            metaTitle: {
                _type: 'object',
                _require: true,
                _parameters: this.translatableInputs('string', true, { attr: { maxlength: 200 } }),
                _label: 'form.label.meta_title',
            },
            metaDescription: {
                _type: 'object',
                _require: true,
                _parameters: this.translatableInputs('textarea', true, { attr: { maxlength: 200 } }),
                _label: 'form.label.meta_description',
            },
            analyticsUsername: {
                _type: 'string',
                _required: false,
                _label: 'form.label.analytics_username',
            },
            analyticsPassword: {
                _type: 'password',
                _required: false,
                _label: 'form.label.analytics_password',
            },
            analyticsWebsiteId: {
                _type: 'string',
                _required: false,
                _label: 'form.label.analytics_website_id',
            }
        }
    }
}
