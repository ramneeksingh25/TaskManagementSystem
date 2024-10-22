module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "To Do",
    },
    isMultiUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Single-user task by default
    },
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    }
  });

  // Associations
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'creatorId', as: 'creator' });
    
    // Many-to-many relationship for multi-user tasks
    Task.belongsToMany(models.User, { through: models.UserTask, foreignKey: 'taskId', as: 'assignees' });
  };

  return Task;
};
