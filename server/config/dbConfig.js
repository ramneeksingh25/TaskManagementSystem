module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'appleramneek',
    DB: 'task_management_system',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}