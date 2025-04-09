import express from 'express'
import {fetchAllUsers,addUser,loginUser,fetchUserByID} from '../controller/userController.js'
import fileUploadMiddleware from '../cloudnary/uploadImage.js'

const userRoute = express.Router();

userRoute.get('/', fetchAllUsers)
userRoute.get('/:id' ,fetchUserByID)
userRoute.post('/addUser',fileUploadMiddleware("profile"),addUser)
userRoute.post('/loginUser' , loginUser)

export default userRoute;