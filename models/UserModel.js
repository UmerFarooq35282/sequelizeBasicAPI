import { Model, DataTypes } from "sequelize";
import {sequelize} from '../db/connection.js'

class User extends Model {}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // By Default allowNull is true
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        profile: {
            type:DataTypes.STRING,
            allowNull: true
        }
    }, 
    {
        sequelize,
        modelName: 'User'
    }
);

export default User;

