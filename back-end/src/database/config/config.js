require('dotenv').config();

// descomentar a linha abaixo se quiser rodar no windows---
const environment = process.env.NODE_ENV || 'dev';
// const environment = process.env.NODE_ENV || 'test';

const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: 
    `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};


module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
