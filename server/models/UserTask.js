module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define("UserTask", {
      userId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Users', 
              key: 'id',    
          },
          primaryKey: true,
      },
      taskId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Tasks', 
              key: 'id',  
          },
          primaryKey: true,
      },
      role: {
          type: DataTypes.STRING,
          allowNull: true,
      }
  });

  return UserTask;
};