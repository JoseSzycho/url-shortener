import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../httpErrors/BadRequestError.httpError';

export const validateReqBody = (schema: JSONSchemaType<unknown>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ allErrors: true });
        addFormats(ajv, ['url']);
        const validate = ajv.compile(schema);

        if (validate(req.body)) {
            next();
            return;
        } else {
            const error = new BadRequestError('The request object is incorrect');
            next(error);
        }
    };
};
