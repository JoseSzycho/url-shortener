import { ICustomError } from '../interfaces/customError.interface';

export class BadRequestError extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}
