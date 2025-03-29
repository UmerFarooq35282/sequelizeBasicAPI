import express from 'express'
import { getAllCategories } from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.get('/' , getAllCategories)

export default categoryRoute;