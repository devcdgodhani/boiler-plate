import { ObjectId } from 'mongoose';
import { COMMON_STATUS } from '../constants';
import { IDefaultAttributes } from './common';

export interface ISubCategoryAttributes extends IDefaultAttributes {
  id: ObjectId;
  title: string;
  description: string;
  enTitle: string;
  categoryId: ObjectId;
  status: COMMON_STATUS;
}

export interface ISubCategoryDocument extends Omit<ISubCategoryAttributes, 'id'>, Document {}
