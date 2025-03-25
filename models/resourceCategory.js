const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const ResourceCategory = db.define("ResourceCategory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING
    }
}, {
    tableName: "resourcecategory",
    timestamps: false
});

module.exports = ResourceCategory;
