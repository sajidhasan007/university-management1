import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import { IacademicSemester } from './academicSemester.interface';
import sendReponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const getAllSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, academicSemesterFilterableFields);
    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions,
      filters
    );
    sendReponse<IacademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      meta: result?.meta,
      data: result?.data,
    });
    next();
  }
);

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemister = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemister
    );
    sendReponse<IacademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
};
