import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

const dtoValidation = (type: any, skipMissingProperties = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(type, req.body);
      const errors = await validate(dto, { skipMissingProperties });
      if (errors.length > 0) {
        const dtoErrors: any = {};
        errors.forEach((error: ValidationError) => {
          const values = (Object as any).values(error.constraints).join(", ");
          dtoErrors[error.property] = values;
        });
        res.status(422).json({ errors: dtoErrors });
      } else {
        next();
      }
    } catch (ex) {
      res.status(500);
    }
  };
};

export default dtoValidation;
