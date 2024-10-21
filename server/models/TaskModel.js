module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Completed'),
        defaultValue: 'To Do'
      }
    });
  
    Task.associate = (models) => {
      Task.belongsTo(models.User, { foreignKey: 'creatorId', as: 'creator' });
      Task.belongsTo(models.User, { foreignKey: 'assigneeId', as: 'assignee' });
    };
  
    return Task;
  };
  