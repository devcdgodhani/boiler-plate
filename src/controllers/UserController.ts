import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE, AUTH_SUCCESS_MESSAGES } from '../constants';
import { UserService } from '../services';

export default class UserController {
  userService = new UserService();

  constructor() {}

  /*********** Fetch users ***********/
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  getWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  /*********** Create users ***********/
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.CREATED.STATUS,
        code: HTTP_STATUS_CODE.CREATED.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  /*********** Update users ***********/
  updateManyByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  updateOneByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };

  /*********** Delete users ***********/
  deleteByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        status: HTTP_STATUS_CODE.OK.STATUS,
        code: HTTP_STATUS_CODE.OK.CODE,
        message: AUTH_SUCCESS_MESSAGES.LOGGED_IN_SUCCESS,
      };
      return res.status(response.status).json(response);
    } catch (err) {
      return next(err);
    }
  };
}
