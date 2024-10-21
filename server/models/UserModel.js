module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: "user", // 'admin' for admin users
		},
	});

	User.associate = (models) => {
		User.hasMany(models.Task, { foreignKey: "creatorId", as: "createdTasks" });
		User.hasMany(models.Task, {
			foreignKey: "assigneeId",
			as: "assignedTasks",
		});
	};

	return User;
};
