import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port || 3306,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

export default sequelize;
