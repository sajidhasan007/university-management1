import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelpers } from '../../helper/paginationHelper';
import {
  IAcademicSemesterFilters,
  IacademicSemester,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterSearchableFields } from './academicSemester.constant';

const getAllSemester = async (
  pagination: IPaginationOptions,
  filters: IAcademicSemesterFilters
): Promise<IGenericResponse<IacademicSemester[]>> => {
  // sortOrder;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, ...filtersData } = filters; // ...filtersData

  const sortOptions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOptions[sortBy] = sortOrder;
  }

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortOptions)
    .limit(limit)
    .skip(skip);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createAcademicSemester = async (
  payload: IacademicSemester
): Promise<IacademicSemester | null> => {
  const response = AcademicSemester.create(payload);

  if (!response) {
    throw new ApiError(400, 'Faield to create');
  }

  return response;
};

const getSingleSemester = async (
  id: string
): Promise<IacademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
};
