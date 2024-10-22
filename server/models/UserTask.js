module.exports = (sequelize, DataTypes) => {
    const UserTask = sequelize.define("UserTask", {
      role: {
        type: DataTypes.STRING,
        allowNull: true, // E.g., "owner", "collaborator", etc.
      }
    });
  
    return UserTask;
  };