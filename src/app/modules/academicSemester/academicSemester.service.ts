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

  const andConditions = [
    {
      $or: [
        {
          title: {
            $regex: searchTerm || '',
            $options: 'i',
          },
        },
        {
          code: {
            $regex: searchTerm || '',
            $options: 'i',
          },
        },
      ],
    },
  ];

  const result = await AcademicSemester.find({ $and: andConditions })
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

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
};
