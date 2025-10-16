import { ObjectId } from 'mongoose';
import { AUTH_ACTION_TYPE } from '../constants';
import { IDefaultAttributes } from './common';

export interface IAuthActionHistoryAttributes extends IDefaultAttributes {
  id: ObjectId;
  userId: ObjectId;
  type: AUTH_ACTION_TYPE;
  actionAt: number;
  deviceId: string;
  deviceIp: boolean;
}

export interface IAuthActionHistoryDocument
  extends Omit<IAuthActionHistoryAttributes, 'id'>,
    Document {}
