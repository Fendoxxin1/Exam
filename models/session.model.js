module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
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

  return Session;
};
