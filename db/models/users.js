import sequelize from '../config.js';
import { DataTypes } from 'sequelize';
const users = sequelize.define(
  'users',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginAttempt: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default users;
