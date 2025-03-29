import CategoryModel from "../models/categoryModel.js";

const getAllCategories = async (req,res) => {
    try {
        var categories = await CategoryModel.findAll();
        res.send(categories);
    } catch (error) {
        console.log('Error in fetching Categories' ,error)
    }
}

export {getAllCategories}