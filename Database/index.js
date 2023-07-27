const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize('mysql://root:12345@localhost:3306/sample');


    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    });
    
    module.exports = { sequelize, Sequelize };
    

   

