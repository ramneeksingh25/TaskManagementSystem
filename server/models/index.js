const dbConfig = require("../config/dbConfig.js")
const {Sequelize,DataTypes}= require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate().then(()=>{
    console.log("Connection has been established successfully.");
}).catch(err=>{console.log("Error in sequelize:",err)})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./UserModel.js")(sequelize,DataTypes)
db.tasks = require("./TaskModel.js")(sequelize,DataTypes)

db.sequelize.sync({force:false}).then(()=>{console.log("Yes re-sync done!");
})


module.exports = db;