import express from 'express';
import { UserRoutes } from '../modules/users/user.router';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.router';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/academic-semester', AcademicSemesterRoute);

export default router;
