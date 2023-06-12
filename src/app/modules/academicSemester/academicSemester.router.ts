import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterVadidation } from './academicSemester.zodValidator';

const router = express.Router();
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemester);

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterVadidation.createAcademicSemisterSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoute = router;
