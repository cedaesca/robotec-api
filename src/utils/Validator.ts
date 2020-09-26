import { validate, ValidationError } from 'class-validator';
import BaseEntity from '../entity/BaseEntity';

export default class Validator {
    public entity: BaseEntity;

    constructor(entity) {
        this.entity = entity;
    }

    public async check() {
        const errors = await validate(this.entity);

        if (errors.length > 0) {
            return this.formatErrors(errors);
        }

        return {};
    }

    private formatErrors(errors: ValidationError[]) {
        const formattedErrors = {};

        for (const error of errors) {
            const attributeErrors = Object.keys(error.constraints).map(
                (key) => error.constraints[key]
            );

            formattedErrors[error.property] = attributeErrors;
        }

        return formattedErrors;
    }
}
