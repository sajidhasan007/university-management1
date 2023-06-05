import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserVadidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserVadidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
