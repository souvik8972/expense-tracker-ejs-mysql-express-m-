const Sequelize=require("../database/sequelize");
const {DataTypes}=require("sequelize")



const addedMoney=Sequelize.define("addedMoney",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },information:{
        type:DataTypes.STRING,
        allowNull:false
    },amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})



module.exports=addedMoney