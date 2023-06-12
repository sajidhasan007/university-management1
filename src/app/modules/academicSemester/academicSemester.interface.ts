import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterCodes = '01' | '02' | '03';
export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IacademicSemester = {
  title: IAcademicSemesterTitles;
  year: number;
  code: '01' | '02' | '03';
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

export type AcademicSemesterModel = Model<IacademicSemester, object>;
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
