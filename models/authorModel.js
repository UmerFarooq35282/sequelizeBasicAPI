import {Model,DataTypes} from 'sequelize'
import CategoryModel from './categoryModel.js'
import {sequelize} from '../db/connection.js'


class AuthorModel extends Model {}

AuthorModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_url:{
            type: DataTypes.STRING
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps:false,
        tableName: 'authors'
    }
)
AuthorModel.belongsTo(CategoryModel,{foreignKey:"category_id"})
CategoryModel.hasMany(AuthorModel,{foreignKey: "category_id"})

// async function MakeAuthorModel(params) {
//     try {
//         await AuthorModel.sync()
//         console.log("Author Model And Table Created")
//     } catch (error) {
//         console.log('Cannot make Author Model')
//     }
// }
// MakeAuthorModel()


export default AuthorModel;