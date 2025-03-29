import express from 'express'
import {fetchAllUsers,addUser,loginUser} from '../controller/userController.js'
import upload from '../utils/handleFIleUpload.js';

const userRoute = express.Router();

userRoute.get('/', fetchAllUsers)
userRoute.post('/addUser',addUser)
userRoute.post('/loginUser' , loginUser)

export default userRoute;