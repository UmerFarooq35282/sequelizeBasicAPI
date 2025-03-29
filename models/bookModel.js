import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";
import CategoryModel from "./categoryModel.js";
import AuthorModel from "./authorModel.js";
class BookModel extends Model {}

BookModel.init(
  {
    BookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING,
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    StockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AuthorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: false,
  }
);

BookModel.belongsTo(CategoryModel, { foreignKey: "CategoryId" });
BookModel.belongsTo(AuthorModel, { foreignKey: "AuthorID" });

CategoryModel.hasMany(BookModel, { foreignKey: "CategoryId" });
AuthorModel.hasMany(BookModel, { foreignKey: "AuthorID" });

// async function MakeBookModel(params) {
//   try {
//     await BookModel.sync();
//     console.log("Book Model And Table Created");
//   } catch (error) {
//     console.log("Cannot make Book Model");
//   }
// }
// MakeBookModel();

export default BookModel;
