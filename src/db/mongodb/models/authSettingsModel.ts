import { Schema, model } from 'mongoose';
import { IAuthSettingsDocument } from '../../../interfaces';
import {
  AUTH_SETTINGS_ALLOW_LOGIN_FOR,
  AUTH_SETTINGS_ALLOW_SIGN_UP_FOR,
  AUTH_SETTINGS_TYPE,
} from '../../../constants';

// Schema
const AuthSettingsSchema = new Schema<IAuthSettingsDocument>(
  {
    emailVerification: { type: Boolean, required: true, default: false },
    mobileVerification: { type: Boolean, required: true, default: false },
    allowLoginFor: {
      type: [String],
      enum: Object.values(AUTH_SETTINGS_ALLOW_LOGIN_FOR),
      required: true,
    },
    allowSignFor: {
      type: [String],
      enum: Object.values(AUTH_SETTINGS_ALLOW_SIGN_UP_FOR),
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(AUTH_SETTINGS_TYPE),
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Model
export const AuthSettingsModel = model<IAuthSettingsDocument>('auth_settings', AuthSettingsSchema);
