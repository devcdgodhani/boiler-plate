import { ObjectId } from 'mongoose';
import { OTP_TYPE, TOKEN_TYPE } from '../constants';
import { IDefaultAttributes } from './common';

export interface IOtpAttributes extends IDefaultAttributes {
  id: ObjectId;
  code: string;
  type: OTP_TYPE;
  generateTokens: TOKEN_TYPE[];
  userId: ObjectId;
  expiredAt: number;
  maxUses: number;
  usesCount?: number;
}

export interface IOtpDocument extends Omit<IOtpAttributes, 'id'>, Document {}
