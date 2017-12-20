/**
 * Created by tarun on 20/7/17.
 */

const sequelize = require('sequelize');

const db = new sequelize({
    host: 'localhost',
    username: 'newuser',
    database: 'db',
    password: 'taruntrehan',
    dialect: 'mysql'
})

const mydata =  db.define('username',{
    sid:{type:sequelize.DataTypes.STRING,
    primaryKey:true
    },
    username:sequelize.DataTypes.STRING,
    pass:sequelize.DataTypes.STRING
});
const chats =  db.define('chats',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    chat:sequelize.DataTypes.STRING,
    username:sequelize.DataTypes.STRING,
    sid:sequelize.DataTypes.STRING
});
db.sync().then(function () {
    console.log("Database is ready");
})

module.exports = {
    mydata,
    chats
}