module.exports = (sequelize, DataTypes) => {
    const LcMajors = sequelize.define(
      "LcMajors",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        majorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Majors",
            key: "id",
          },
        },
        learningcId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "LearningCenter",
            key: "id",
          },
        },
      },
      {
        tableName: "lcmajors",
        timestamps: false,
      }
    );
  
    LcMajors.associate = (models) => {
      LcMajors.belongsTo(models.Majors, {
        foreignKey: "majorId",
        as: "major",
      });
  
      LcMajors.belongsTo(models.LearningCenter, {
        foreignKey: "learningcId",
        as: "learningCenter",
      });
    };
  
    return LcMajors;
  };
  