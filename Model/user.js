
const { DataTypes } = require('sequelize');
const {sequelize} = require('../Database/index.js');

const User = sequelize.define('User', {
  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, 
  },
  resetToken: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
