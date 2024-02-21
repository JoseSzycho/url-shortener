import { ICustomError } from '../interfaces/customError.interface';

export class NotFoundError extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}
