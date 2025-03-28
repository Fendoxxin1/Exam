const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Like = db.define("Like", {
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
<<<<<<< HEAD
      model: "EducationalCenters",
=======
      model: "EducationalCenter",
>>>>>>> d556bc41bec362b9e77a9fc534c4940b80453abe
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

module.exports = Like;
