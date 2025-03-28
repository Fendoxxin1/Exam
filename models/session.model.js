const { db } = require("../config/db");
const { DataTypes } = require("sequelize");
const Session = db.define("Session", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  device: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Session;