import dotenv from 'dotenv';

dotenv.config();

const SystemParams = {
  MYSQL_DB_HOST: process.env.DB_HOST,
  MYSQL_DB_NAME: process.env.DB_NAME,
  MYSQL_DB_USER: process.env.DB_USER,
  MYSQL_DB_PASSWORD: process.env.DB_PASSWORD,
}

export default SystemParams;