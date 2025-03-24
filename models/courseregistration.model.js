const { db } = require("../config/db");

const CourseRegistration = db.define("CourseRegistration", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  educationalCenterId: { type: DataTypes.INTEGER },
  filialId: { type: DataTypes.INTEGER },
});

module.exports = CourseRegistration;
