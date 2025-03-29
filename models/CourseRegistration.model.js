const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const UserEnrollment = db.define("UserEnrollment", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  educationalId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  filialId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = UserEnrollment;
