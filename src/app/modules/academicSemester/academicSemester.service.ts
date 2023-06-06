import ApiError from '../../../errors/ApiError';
import { IacademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

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
};
