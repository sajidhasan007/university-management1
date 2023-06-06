import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const academicSemister = req.body;
  // console.log('my payload is = ', academicSemister);
  try {
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemister
    );
    res.status(200).json({
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }

  //   next();
};

export const AcademicSemesterController = {
  createAcademicSemester,
};
