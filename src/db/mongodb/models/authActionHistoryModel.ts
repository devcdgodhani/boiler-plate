import { Schema, model, } from 'mongoose';
import { IAuthActionHistoryDocument } from '../../../interfaces';
import { AUTH_ACTION_TYPE } from '../../../constants';

// Schema
const AuthActionHistorySchema = new Schema<IAuthActionHistoryDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    type: { type: String, enum: Object.values(AUTH_ACTION_TYPE), required: true },
    actionAt: { type: Number, required: true },
    deviceId: { type: String, required: true },
    deviceIp: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Model
export const AuthActionHistoryModel = model<IAuthActionHistoryDocument>(
  'auth_action_histories',
  AuthActionHistorySchema,
);
