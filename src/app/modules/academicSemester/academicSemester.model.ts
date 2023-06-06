import { model, Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IacademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IacademicSemester>({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  code: { type: String, required: true },
  startMonth: { type: String, required: true },
  endMonth: { type: String, required: true },
});
export const AcademicSemester = model<IacademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
