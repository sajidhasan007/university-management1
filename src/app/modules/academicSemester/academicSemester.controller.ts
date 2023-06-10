import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import { IacademicSemester } from './academicSemester.interface';
import sendReponse from '../../../shared/sendResponse';

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
};
