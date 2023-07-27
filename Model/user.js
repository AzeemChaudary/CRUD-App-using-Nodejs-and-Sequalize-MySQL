
const { DataTypes } = require('sequelize');
const {sequelize} = require('../Database/index.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,   
    autoIncrement: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
