const { db } = require("../config/db");
const { DataTypes } = require("sequelize");
const UserEnrolment = db.define("CourseRegistration", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
  },
  educationalCenterId: {
    type: DataTypes.INTEGER,
  },
  filialId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = UserEnrolment;
