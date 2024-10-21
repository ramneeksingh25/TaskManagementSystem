module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {module.exports = (sequelize, DataTypes) => {
            const Task = sequelize.define("task", {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                priority: {
                    type: DataTypes.ENUM,
                    values: ['High', 'Medium', 'Low'],
                    defaultValue: 'Medium'
                },
                due_date: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                status: {
                    type: DataTypes.ENUM,
                    values: ['To Do', 'In Progress', 'Completed'],
                    defaultValue: 'To Do'
                },
                creator_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                },
                assignee_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                }
            });
        
            return Task;
        };
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    });

    return User;
};