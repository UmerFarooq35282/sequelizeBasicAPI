import express from 'express';
import { getAllAuthors } from '../controller/authorController.js';
const authorsRoute = express.Router();

authorsRoute.get('/' , getAllAuthors)

export default authorsRoute;