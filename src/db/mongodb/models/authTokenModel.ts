import { Schema, model } from 'mongoose';
import { IAuthTokenDocument } from '../../../interfaces';
import { TOKEN_TYPE } from '../../../constants';

// Schema
const AuthTokenSchema = new Schema<IAuthTokenDocument>(
  {
    token: { type: String, required: true },
    type: { type: String, enum: Object.values(TOKEN_TYPE), required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    expiredAt: { type: Number, required: true },
    referenceTokenId: { type: Schema.Types.ObjectId, ref: 'aut_tokens', required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Model
export const AuthTokenModel = model<IAuthTokenDocument>('aut_tokens', AuthTokenSchema);
