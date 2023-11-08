const express=require("express")
const app=express()
const path=require("path")
//database
const db=require("./database/db")
// env
require("dotenv").config()
const PORT=process.env.PORT||6000

//ejs
app.set("view engine", "ejs")
// static folder
app.use(express.static(path.join(__dirname,"public")))
//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get("/add-money",(req,res)=>{
    res.render("add-money")

})
app.post("/add-money",(req,res)=>{
    const {amount} = req.body
    const sql="insert into money(amount) values(?)"
    db.query(sql,[amount],(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/show-expense")
        }
    })
})
app.get("/show-expense", (req, res) => {
    const moneysql = "SELECT SUM(amount) AS total_amount FROM money"; // Assuming 'amount' is the column name representing the money
    db.query(moneysql, (err, moneyResult) => {
        if (err) {
            console.log(err);
           
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const total = moneyResult[0].total_amount || 0; // Assign 0 if no total amount is found
        
        const sql = 'SELECT * FROM expenses';
        db.query(sql, (err, expenseResult) => {
            if (err) {
                console.log(err);
                // Handle the error, possibly by sending an error response
                res.status(500).send('Internal Server Error');
                return;
            }
            res.render("show-expense", { expenses: expenseResult, total: total });
        });
    });
});



app.get('/',(req,res)=>{
  res.render("index")
    
    
})

app.post("/",(req,res)=>{
    const {details,amount}=req.body
    const sql="insert into expenses(details,amount) values(?,?)"
    db.query(sql,[details,amount],(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/show-expense")
        }
    })


})
app.get('/edit/:id',(req,res)=>{
    const id=req.params.id
    const sql="select * from expenses where id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render("edit-expense",{expense:result[0]})
        }})

})

app.post('/edit/:id',(req,res)=>{
    const id=req.params.id
    const {details,amount} = req.body
    const sql="update expenses set details=?,amount=? where id=?"
    db.query(sql,[details,amount,id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/show-expense")
        }

    })
    

})
app.get("/delete/:id",(req,res)=>{
    const id=req.params.id
    const sql="delete from expenses where id=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/show-expense")
        }
    })
})


app.listen(PORT,()=>{
    console.log("server listening on port",PORT)
})