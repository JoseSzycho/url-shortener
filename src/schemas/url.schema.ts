import { Iurl } from '../interfaces/url.interface';
import { JSONSchemaType } from 'ajv';

export const urlSchema: JSONSchemaType<Iurl> = {
    type: 'object',
    properties: {
        url: { type: 'string', format: 'url' },
    },
    required: ['url'],
    additionalProperties: false,
};
