import { Model, DataTypes } from "sequelize";
import {sequelize} from '../db/connection.js'
// import BookModel from "./bookModel.js";
class CategoryModel extends Model {}

CategoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "category"
    }
);

export default CategoryModel;