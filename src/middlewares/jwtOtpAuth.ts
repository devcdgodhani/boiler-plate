import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV_VARIABLE } from '../configs';
import {
  HTTP_STATUS_CODE,
  AUTH_ERROR_MESSAGES,
  TOKEN_TYPE,
  USER_ERROR_MESSAGES,
  OTP_ERROR_MESSAGES,
} from '../constants';
import { ApiError } from '../helpers';
import { UserService, AuthTokenService } from '../services';
const userService = new UserService();

const authTokenService = new AuthTokenService();
export const jwtOtpAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyData = { ...req.query, ...req.params, ...req.body };

    if (!bodyData.type) {
      throw new ApiError(
        HTTP_STATUS_CODE.BAD_REQUEST.CODE,
        HTTP_STATUS_CODE.BAD_REQUEST.STATUS,
        OTP_ERROR_MESSAGES.INVALID_OTP
      );
    }
    if (!bodyData.accessToken && !bodyData.otp) {
      throw new ApiError(
        HTTP_STATUS_CODE.UNAUTHORIZED.CODE,
        HTTP_STATUS_CODE.UNAUTHORIZED.STATUS,
        AUTH_ERROR_MESSAGES.INVALID_VERIFICATION_OTP
      );
    }

    const authorization = req.headers.authorization || (req.headers.Authorization as string);
    const token: string | undefined = authorization
      ? authorization.split(' ')[1]
      : bodyData.token
        ? bodyData.token
        : undefined;

    if (!token) {
      throw new ApiError(
        HTTP_STATUS_CODE.UNAUTHORIZED.CODE,
        HTTP_STATUS_CODE.UNAUTHORIZED.STATUS,
        AUTH_ERROR_MESSAGES.TOKEN_NOT_FOUND
      );
    }

    let decoded: JwtPayload | string;
    try {
      decoded = await jwt.verify(token, ENV_VARIABLE.JWT_SECRET);
    } catch (err) {
      throw new ApiError(
        HTTP_STATUS_CODE.TOKEN_EXPIRED.CODE,
        HTTP_STATUS_CODE.TOKEN_EXPIRED.STATUS,
        AUTH_ERROR_MESSAGES.EXPIRED_TOKEN
      );
    }

    const tokenDoc = await authTokenService.findOne({
      token,
      type: TOKEN_TYPE.OTP_TOKEN,
      userId: decoded.sub,
    });
    if (!tokenDoc) {
      throw new ApiError(
        HTTP_STATUS_CODE.INVALID_TOKEN.CODE,
        HTTP_STATUS_CODE.INVALID_TOKEN.STATUS,
        AUTH_ERROR_MESSAGES.TOKEN_NOT_FOUND
      );
    }

    const user = await userService.findOne({ id: decoded.sub });
    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODE.UNAUTHORIZED.CODE,
        HTTP_STATUS_CODE.UNAUTHORIZED.STATUS,
        USER_ERROR_MESSAGES.NOT_FOUND
      );
    }
    delete user.password;
    req.user = user;
    req.body = bodyData;
    next();
  } catch (err) {
    next(err);
  }
};
