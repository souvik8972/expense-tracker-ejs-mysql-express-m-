const {Sequelize}= require("sequelize")


const sequelize=new Sequelize("your_money","root","712123@daS",{
    host:"localhost",
    dialect:"mysql"
})


module.exports=sequelize