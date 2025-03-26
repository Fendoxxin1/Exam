module.exports = (sequelize, DataTypes) => {
    const UserEnrolment = sequelize.define(
      "UserEnrolment",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
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
        filialId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "userenrolment",
        timestamps: false,
      }
    );
  
    UserEnrolment.associate = (models) => {
      UserEnrolment.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
  
      UserEnrolment.belongsTo(models.LearningCenter, {
        foreignKey: "learningcId",
        as: "learningCenter",
      });
    };
  
    return UserEnrolment;
  };
  