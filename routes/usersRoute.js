import express from 'express'
import {fetchAllUsers,addUser,loginUser,fetchUserByID} from '../controller/userController.js'

const userRoute = express.Router();

userRoute.get('/', fetchAllUsers)
userRoute.get('/:id' ,fetchUserByID)
userRoute.post('/addUser',addUser)
userRoute.post('/loginUser' , loginUser)

export default userRoute;