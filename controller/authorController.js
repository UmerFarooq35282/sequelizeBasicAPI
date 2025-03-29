import AuthorModel from "../models/authorModel.js";

const getAllAuthors = async (req,res) => {
    try {
        var authors = await AuthorModel.findAll();
        res.send(authors);
    } catch (error) {
        console.log("Error in fetching authors " , error)
    }
}

export {getAllAuthors}