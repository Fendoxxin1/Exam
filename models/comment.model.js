const { db } = require("../config/db");
const { DataTypes } = require("sequelize");
const Comment = db.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  star: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  educationalCenterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Comment;
