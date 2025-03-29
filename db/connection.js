import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  'final_db',
  'root',
  null,
  {
    host: "localhost",
    dialect: 'mysql',
    logging: false,
  }
);

async function ConnectionToDB() {
  try {
    await sequelize.authenticate();
    console.log("DataBase Connected Successfully");
    databaseSync();
  } catch (error) {
    console.log("Database connection failed ", error);
  }
}

async function databaseSync() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database Sync Successfully");
  } catch (error) {
    console.log("Error in syncing database");
  }
}

export { ConnectionToDB, sequelize };
