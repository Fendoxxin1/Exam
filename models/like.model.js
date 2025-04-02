const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const UserLikes = db.define("Like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  educationalcenterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "EducationalCenter",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

module.exports = UserLikes;
