import { Schema, model } from 'mongoose';
import { OTP_TYPE } from '../../../constants';
import { IOtpDocument } from '../../../interfaces';

// Schema
const OtpSchema = new Schema<IOtpDocument>(
  {
    code: { type: String, required: true },
    type: { type: String, enum: Object.values(OTP_TYPE), required: true },
    generateTokens: { type: [String], required: false, default: [] },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    expiredAt: { type: Number, required: true },
    maxUses: { type: Number, required: true, default: 1 },
    usesCount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Model
export const OtpModel = model<IOtpDocument>('otps', OtpSchema);
