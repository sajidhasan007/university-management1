import express from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.router';
import { UserRoutes } from '../modules/users/user.router';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
