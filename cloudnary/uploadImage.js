import 'dotenv/config'
import cloudinary from "./cloudnaryConfig.js";
import fs from 'fs'
import path from "path";
// import BookModel from "../models/bookModel.js";
import {sequelize} from '../db/connection.js'
import CategoryModel from '../models/categoryModel.js';


const productImagesFolder = path.join('../images/Categories')

const uploadImagesToCloudinary = async (imageURL) => {
    try {
        const result = await cloudinary.uploader.upload(imageURL , {
            folder: "My_Categories_images"
        })
        return result;
    } catch (error) {
        console.error('Error in uploading image to cloudinary:: ' , error);
        return null;
    }
}

const updateDatabaseImageURL = async (imageName , newImageName) => {
    try {
        const [updateRows] = await CategoryModel.update({image: newImageName},{where: {
            image: imageName
        }});

        if(updateRows > 0){
            console.log(`Updated ${imageName} --> ${newImageName}`);
        }else{
            console.log(`No book found of matching ImageURL ${imageName}`)
        }
    } catch (error) {
        console.error('Error in updating Database :: uploadImage.js :: ' , error)
    }
}

const processImages = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected")
        const files = fs.readdirSync(productImagesFolder);

        for(const file of files){
            const filePath = path.join(productImagesFolder,file)

            const cloundinaryURL = await uploadImagesToCloudinary(filePath);

            if(cloundinaryURL){
                await updateDatabaseImageURL(file,cloundinaryURL.secure_url);
                fs.unlinkSync(filePath);
            }
        }

        console.log("All Images uploaded and database updated");
        await sequelize.close()
    } catch (error) {
        console.error('Error Proccessing Images ' , error)
    }
}
// processImages();