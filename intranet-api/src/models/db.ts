import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "http://192.168.60.211/api/mfg/",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "mssql", // specify Microsoft SQL Server as the dialect
  }
);

export default sequelize;
