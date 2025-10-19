import { Request, Response, NextFunction } from 'express';
import { IUserAttributes } from '../interfaces';
import { UserSchema } from '../db/mongodb';
import { mongooseToJoi } from '../helpers/joiSchemaBuilder';
import Joi from 'joi';
import { HTTP_STATUS_CODE } from '../constants';
import { ApiError } from '../helpers';

const options = {
  abortEarly: false, // include all errors
  allowUnknown: false, // ignore unknown props
  // stripUnknown: true, // remove unknown props
};

const filterSchema = mongooseToJoi<IUserAttributes>({
  schema: UserSchema,
  singleOrMultiple: true,
});

// const createSchema = mongooseToJoi<IUserAttributes>({
//   schema: UserSchema,
//   includeFields: ['email', 'mobile', 'password', 'firstName', 'lastName', 'countryCode'],
//   requiredFields: ['email', 'mobile', 'password', 'firstName', 'lastName', 'countryCode'],
//   //   singleOrMultiple: true,
// });

// const updateSchema = mongooseToJoi<IUserAttributes>({
//   schema: UserSchema,
//   requiredFields: ['id'],
//   excludeFields: ['isEmailVerified', 'isMobileVerified', 'isVerified', 'email', 'password'],
// });

export default class UserValidator {
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = Joi.object({ ...filterSchema });

      const { error, value: requestBody } = schema.validate(
        { ...req.query, ...req.params, ...req.body },
        options
      );

      if (error) {
        const errorMessage = error.details
          .map((detail) => {
            if (detail.context?.message) {
              return `${detail.message}${detail.context.message}`;
            }
            return detail.message;
          })
          .join(', ');
        throw new ApiError(
          HTTP_STATUS_CODE.BAD_REQUEST.CODE,
          HTTP_STATUS_CODE.BAD_REQUEST.STATUS,
          errorMessage
        );
      }
      req.body = requestBody;

      return next();
    } catch (err) {
      return next(err);
    }
  };
}
