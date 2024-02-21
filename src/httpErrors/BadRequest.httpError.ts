import { ICustomError } from '../interfaces/customError.interface';

export class BadRequest extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}
