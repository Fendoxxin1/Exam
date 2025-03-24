const { db } = require("../config/db");
const Profession = db.define("Profession", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
});

module.exports = Profession