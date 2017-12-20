/**
 * Created by tarun on 12/7/17.
 */

const sequelize = require('sequelize');

const db = new sequelize ({
    host:"localhost",
    username:"root",
    database:"db",
    password:"taruntrehan",
    dialect:"mysql"
});

const todo =  db.define('todo',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    task: sequelize.DataTypes.STRING,
    value:sequelize.DataTypes.BOOLEAN

});

db.sync().then(function () {
    console.log("Database is ready");
})

module.exports = {
    todo
}
