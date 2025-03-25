const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Filial = db.define("Filial", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  region: { type: DataTypes.INTEGER },
  phoneNumber: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  educationalCenterId: { type: DataTypes.INTEGER },
});
module.exports = Filial