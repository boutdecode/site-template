const i18next = require('i18next');

module.exports = class Validator {
    constructor() {
        this.schemas = [];
        this.typeValidators = [];
        this.locale = 'en';
    }

    /**
     * Add type validator
     * @param {string} type
     * @param {function} callback
     */
    addTypeValidator(type, callback) {
        this.typeValidators.push({ type, callback });
    }

    /**
     * Remove type validator
     * @param {string} type
     */
    removeTypeValidator(type) {
        const index = this.typeValidators.findIndex(typeValidator => typeValidator.type === type);
        if (index !== -1) {
            this.typeValidators.splice(index, 1);
        }
    }

    /**
     * Check if there exist type validator
     * @param {string} type
     *
     * @return {boolean}
     */
    hasTypeValidator(type) {
        return !!this.typeValidators.find(typeValidator => typeValidator.type === type);
    }

    /**
     * Add schema to validator
     * @param {string} name
     * @param {Object} schema
     */
    addSchema(name, schema) {
        if (!this.hasSchema(name)) {
            this.schemas.push({ name, schema });
        }
    }

    /**
     * Check if there exist schema
     * @param {string} name
     *
     * @return {boolean}
     */
    hasSchema(name) {
        return !!this.schemas.find(s => s.name === name);
    }

    /**
     * Remove schema
     * @param {string} name
     *
     * @return {boolean}
     */
    removeSchema(name) {
        const index = this.schemas.findIndex(s => s.name === name);

        if (index > -1) {
            this.schemas.splice(index, 1);
        }
    }

    /**
     * Validate data with schema
     * @param {Object} data
     * @param {string|Object} name
     *
     * @return {Object|Error}
     */
    validate(data, name) {
        const result = {};
        const errors = {};
        let valid = true;

        let schema;
        if (typeof name === 'object') {
            schema = name;
        } else {
            schema = this.schemas.find(s => s.name === name);
            schema = schema ? schema.schema : null;
        }

        if (!schema) {
            throw new Error(`Schema named "${name}" not found.`);
        }

        let node, schemaNode;
        for (let key in schema) {
            node = data[key];
            schemaNode = schema[key];

            try {
                switch (schemaNode._type) {
                    case 'string':
                        result[key] = this.validateString(node, schemaNode);
                        break;
                    case 'number':
                        result[key] = this.validateNumber(node, schemaNode);
                        break;
                    case 'boolean':
                        result[key] = this.validateBoolean(node, schemaNode);
                        break;
                    case 'array':
                        result[key] = this.validateArray(node, schemaNode);
                        break;
                    case 'object':
                        result[key] = this.validateObject(node, schemaNode);
                        break;
                    default:
                        const typeValidator = this.typeValidators.find(({ type }) => type === schemaNode._type);
                        if (typeValidator) {
                            result[key] = typeValidator.callback.call(this, node, schemaNode);
                            break;
                        }

                        throw new Error('Schema node needs "type" parameter.');
                }
            } catch (e) {
                errors[key] = e.message;
                valid = false;
            }

            if (undefined === result[key]) {
                delete result[key];
            }
        }

        return { result, errors, valid };
    }

    /**
     * Validate string value
     * @param {*} value
     * @param {Object} schema
     *
     * @return {string|Error}
     */
    validateString(value, schema) {
        if (schema._required && (undefined === value || null === value)) {
            throw new Error(i18next.t('validator.required'));
        } else if (!schema._required && undefined === value) {
            return schema._default || (schema._optional ? undefined : null);
        }

        if (null !== value && typeof value !== 'string') {
            throw new Error(i18next.t('validator.be_string', { type: typeof value }));
        }

        if (schema._minLength !== undefined && (
            false === Number.isInteger(schema._minLength)
            || schema._minLength < 0
            || null === value
            || value.length < schema._minLength)
        ) {
            throw new Error(`Parameter has to be at least ${schema._minLength} characters.`);
        }

        if (schema._maxLength !== undefined && (
            false === Number.isInteger(schema._maxLength)
            || schema._maxLength < 0
            || value.length > schema._maxLength)) {
            throw new Error (`Parameter must be no longer than ${schema._maxLength} characters.`);
        }

        if (schema._pattern && (typeof schema._pattern !== 'string' || null === value.match(new RegExp(schema._pattern)))) {
            throw new Error(`Parameter has to match the following regex ${schema._pattern}.`);
        }

        return value;
    }

    /**
     * Validate number value
     * @param {*} value
     * @param {Object} schema
     *
     * @return {number|Error}
     */
    validateNumber(value, schema) {
        if (schema._required && (undefined === value || null === value)) {
            throw new Error('Parameter is required.');
        } else if (!schema._required && undefined === value) {
            return schema._default || (schema._optional ? undefined : 0);
        }

        if (!isNaN(value) && schema._parseInt === true) {
            value = parseInt(value);
        } else if (!isNaN(value) && schema._parseFloat === true) {
            value = parseFloat(value);
        }

        if (null !== value && typeof value !== 'number') {
            throw new Error(`Parameter has to be a number, "${typeof value}" instead.`);
        }

        if (schema._multipleOf !== undefined && (
            typeof schema._multipleOf !== 'number'
            || schema._multipleOf <= 0
            || 0 !== value % schema._multipleOf
        )) {
            throw new Error(`Parameter has to a multiple of ${schema._multipleOf}.`);
        }

        if (schema._maximum !== undefined && (typeof schema._maximum !== 'number' || null === value || value > schema._maximum)) {
            throw new Error(`Parameter must be less or equal than ${schema._maximum}.`);
        }

        if (schema._exclusiveMaximum !== undefined && (typeof schema._exclusiveMaximum !== 'number' || null === value || value >= schema._exclusiveMaximum)) {
            throw new Error(`Parameter must be strictly less than ${schema._exclusiveMaximum}.`);
        }

        if (schema._minimum !== undefined && (typeof schema._minimum !== 'number' || null === value || value < schema._minimum)) {
            throw new Error(`Parameter must be greater than ${schema._minimum}.`);
        }

        if (schema._exclusiveMinimum !== undefined && (typeof schema._exclusiveMinimum !== 'number' || null === value || value <= schema._exclusiveMinimum)) {
            throw new Error(`Parameter must be strictly greater than ${schema._exclusiveMinimum}.`);
        }

        return value;
    }

    /**
     * Validate boolean value
     * @param {*} value
     * @param {Object} schema
     *
     * @return {boolean|Error}
     */
    validateBoolean(value, schema) {
        if (schema._required && undefined === value) {
            throw new Error('Parameter is required.');
        } else if (!schema._required && undefined === value) {
            return undefined !== schema._default ? schema._default : (schema._optional ? undefined : true);
        }

        if (typeof value !== 'boolean' && !['true', 'false', '0', '1'].includes(value)) {
            throw new Error(`Parameter has to be a boolean, "${typeof value}" instead.`);
        }

        if (typeof value !== 'boolean') {
            return value === 'true' || value === '1';
        }

        return !!value;
    }

    /**
     * Validate Array value
     * @param {*} value
     * @param {Object} schema
     *
     * @return {Array|Error}
     */
    validateArray(value, schema) {
        if (schema._required && undefined === value) {
            throw new Error('Parameter is required.');
        } else if (!schema._required && undefined === value) {
            return schema._default || (schema._optional ? undefined : []);
        }

        if (!Array.isArray(value)) {
            throw new Error(`Parameter has to be a array, "${typeof value}" instead.`);
        }

        if (schema._items) {
            schema._items._required = true;

            let key;
            let arrayValue = {};
            let arraySchema = {};
            return value.map((v, i) => {
                key = '_array[' + i + ']';
                arrayValue[key] = v;
                arraySchema[key] = schema._items;

                return this.validate(arrayValue, arraySchema)[key];
            });
        }

        return value;
    }

    /**
     * Validate Object value
     * @param {*} value
     * @param {Object} schema
     *
     * @return {Object|Error}
     */
    validateObject(value, schema) {
        if (schema._required && undefined === value) {
            throw new Error('Parameter is required.');
        } else if (!schema._required && undefined === value) {
            return schema._default || (schema._optional ? undefined : {});
        }

        if (typeof value !== 'object') {
            throw new Error(`Parameter has to be a object, "${typeof value}" instead.`);
        }

        if (null !== value && schema._parameters) {
            return this.validate(value, schema._parameters);
        }

        return value;
    }

    /**
     * Clear schemas and type validator collection
     */
    clear() {
        this.schemas = [];
        this.typeValidators = [];
    }
}
