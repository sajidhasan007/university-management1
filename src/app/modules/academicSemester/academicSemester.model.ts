import { model, Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IacademicSemester,
} from './academicSemester.interface';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<IacademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: acdemicSemesterMonths },
    endMonth: { type: String, required: true, enum: acdemicSemesterMonths },
  },
  { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    year: this.year,
    title: this.title,
  });
  // const isExist = await AcademicSemester.findOne({
  //   title: this.title,
  //   year: this.year,
  // });
  // console.log('find = ', isExist);

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Semester is already exist');
  }

  next();
});

export const AcademicSemester = model<IacademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
