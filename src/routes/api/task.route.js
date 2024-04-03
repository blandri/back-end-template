import express from 'express';
import { checkLoggedInUser } from '../../middlewares/access.middleware';
import TaskController from '../../controllers/task.controller';
import upload from '../../helpers/multer';

const routes = express.Router();

routes.post(
  '/create-task',
  checkLoggedInUser,
  upload.single('attach'), 
  async (req, res) => {
    await new TaskController().createTask(req, res)
  });

routes.get(
  '/tasks/:offset/:limit/:filter', 
  checkLoggedInUser,
  async (req, res) => {
  await new TaskController().getAllTasks(req, res)
})

routes.get(
  '/download-excel',
  checkLoggedInUser,
  async (req, res) => {
  await new TaskController().downloadExcel(req, res)
})

export default routes;