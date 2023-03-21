// src/database.ts
import { Sequelize } from 'sequelize';

const DB_NAME = 'your_database_name';
const DB_USER = 'your_database_user';
const DB_PASSWORD = 'your_database_password';
const DB_HOST = 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
