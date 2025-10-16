import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  Model as MongooseModel,
  PopulateOptions,
  MongooseUpdateQueryOptions,
  UpdateWriteOpResult,
  ClientSession,
  CreateOptions,
  PipelineStage,
  ProjectionType,
  DeleteResult,
  ObjectId,
} from 'mongoose';
import { IMongooseCommonService } from '../../services';
import { IPaginationData } from '../../interfaces';

export class MongooseCommonService<T, TDoc extends Document>
  implements IMongooseCommonService<T, TDoc>
{
  private model: MongooseModel<TDoc>;

  constructor(model: MongooseModel<TDoc>) {
    this.model = model;
  }

  // ==========================
  // READ
  // ==========================

  findAll = async (
    filter: FilterQuery<T>,
    options: QueryOptions = {},
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T[]> => {
    const query = this.model.find(filter, null, options);
    if (populate) query.populate(populate);
    return query.lean<T[]>().exec();
  };

  findOne = async (
    filter: FilterQuery<T>,
    options: QueryOptions = {},
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T | null> => {
    const query = this.model.findOne(filter, null, options);
    if (populate) query.populate(populate);
    return query.lean<T>().exec();
  };

  findById = async (
    id: string,
    options: QueryOptions = {},
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T | null> => {
    const query = this.model.findById(id, null, options);
    if (populate) query.populate(populate);
    return query.lean<T>().exec();
  };

  findAllWithPagination = async (
    filter: FilterQuery<T>,
    options: QueryOptions & {
      page?: number;
      limit?: number;
      order?: [string, string][];
      projection?: ProjectionType<T>;
    } = {},
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<IPaginationData<T>> => {
    const convertOrderToSort = (order: [string, string][]): Record<string, 1 | -1> => {
      const sort: Record<string, 1 | -1> = {};
      for (const [key, direction] of order) {
        sort[key] = direction.toUpperCase() === 'DESC' ? -1 : 1;
      }
      return sort;
    };

    const { order, projection, page = 1, limit = 10, ...restOptions } = options;

    const sort = convertOrderToSort(order || [['updatedAt', 'DESC']]);
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;

    const totalRecords = await this.model.countDocuments(filter).exec();
    const totalPages = Math.ceil(totalRecords / safeLimit);

    const query = this.model.find(filter, projection, {
      ...restOptions,
      limit: safeLimit,
      skip,
      sort,
    });

    if (populate) query.populate(populate);

    const recordList = await query.lean<T[]>().exec();

    return {
      limit: safeLimit,
      totalRecords,
      totalPages,
      hasPreviousPage: safePage > 1,
      currentPage: Math.min(safePage, totalPages),
      hasNextPage: safePage < totalPages,
      recordList,
    };
  };

  count = async (filter: FilterQuery<T>): Promise<number> => {
    return this.model.countDocuments(filter).exec();
  };

  // ==========================
  // WRITE
  // ==========================

  update = async (
    filter: FilterQuery<T>,
    updateData: UpdateQuery<TDoc>,
    options: MongooseUpdateQueryOptions<T> & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<UpdateWriteOpResult | null> => {
    return this.model.updateMany(filter, updateData, options).exec();
  };

  updateOne = async (
    filter: FilterQuery<T>,
    updateData: UpdateQuery<TDoc>,
    options: MongooseUpdateQueryOptions<T> & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<UpdateWriteOpResult | null> => {
    return this.model.updateOne(filter, updateData, options).exec();
  };

  upsert = async (
    filter: FilterQuery<T>,
    updateData: UpdateQuery<TDoc>,
    options: QueryOptions & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<T | null> => {
    return this.model
      .findOneAndUpdate(filter, updateData, {
        ...options,
        upsert: true,
        new: true,
      })
      .lean<T>()
      .exec();
  };

  create = async (
    createData: Partial<T>,
    options: CreateOptions & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<T> => {
    const payload = { ...createData, createdBy: options.userId } as Partial<T>;
    const [createdDoc] = await this.model.create([payload], options);
    return createdDoc as T;
  };

  bulkCreate = async (
    createData: Partial<T>[],
    options: CreateOptions & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<T[]> => {
    const payload = createData.map((data) => ({
      ...data,
      createdBy: options.userId,
    })) as Partial<T>[];
    const docs = await this.model.create(payload, options);
    return docs.map((d) => d.toObject() as T);
  };

  // ==========================
  // DELETE (Soft Delete)
  // ==========================

  softDelete = async (
    filter: FilterQuery<T>,
    options: MongooseUpdateQueryOptions<T> & { userId?: ObjectId; session?: ClientSession } = {}
  ): Promise<UpdateWriteOpResult | null> => {
    return this.model
      .updateMany(
        filter,
        { deletedBy: options.userId, deletedAt: new Date() } as UpdateQuery<TDoc>,
        options
      )
      .exec();
  };

  delete = async (filter: FilterQuery<T>): Promise<DeleteResult | null> => {
    return this.model.deleteMany(filter).exec();
  };

  // ==========================
  // AGGREGATE
  // ==========================

  aggregate = async (pipeline: PipelineStage[]): Promise<Record<string, unknown>[]> => {
    return this.model.aggregate(pipeline).exec();
  };
}
