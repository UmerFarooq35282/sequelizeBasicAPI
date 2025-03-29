import BookModel from "../models/bookModel.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.findAll();
    res.send(books);
  } catch (error) {
    console.log("Error in fetching in Books Data ", error);
  }
};

const getBooksByCat = async (req, res) => {
  var categoryID = req.query.catID;
  try {
    var booksByCategories = await BookModel.findAll({
      where: {
        CategoryId: categoryID,
      },
    });
    res.send(booksByCategories);
  } catch (error) {
    console.log("Error in fetching Books by Category ", error);
  }
};

const getBookByID = async (req, res) => {
  var {BookID} = req.body;
  try {
    var booksByName = await BookModel.findAll({
      where: {
        BookID: BookID,
      },
    });
    res.send(booksByName);
  } catch (error) {
    console.log("Error in fetching Books By Category ", error);
  }
};

export { getAllBooks, getBooksByCat, getBookByID };
