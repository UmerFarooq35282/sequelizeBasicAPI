import express from 'express'
import {fetchAllUsers,addUser,loginUser,fetchUserByID} from '../controller/userController.js'
import upload from '../utils/handleFIleUpload.js';
const userRoute = express.Router();

userRoute.get('/', fetchAllUsers)
userRoute.get('/:id' ,fetchUserByID)
userRoute.post('/addUser', upload.single("profile") , addUser)
userRoute.post('/loginUser' , loginUser)

export default userRoute;