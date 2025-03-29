import express from "express";
import {
  getAllBooks,
  getBooksByCat,
  getBookByID,
} from "../controller/bookController.js";
import fileUploadMiddleware from "../utils/handleFIleUpload.js";

const booksRoute = express.Router();

booksRoute.get("/", (req, res) => {
  var { catID, bookID } = req.query;
  if (catID) {
    getBooksByCat(req, res);
  } else if (bookID) {
    getBookByID(req, res);
  } else {
    getAllBooks(req, res);
  }
});

booksRoute.post('/bookByID' , getBookByID);

booksRoute.post('/addBook' , fileUploadMiddleware('bookImage') , (req,res) => {
  console.log(req.file.mimetype)
})

export default booksRoute;
