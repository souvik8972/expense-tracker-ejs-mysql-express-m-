const mysql =require("mysql2")
const connected=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"712123@daS",
    database:"your_money"
})

module.exports=connected