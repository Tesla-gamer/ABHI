const express =require("express");

const path=require('path');

const mysql=require("mysql");

const app=express();

const dotenv=require('dotenv');

const cookieParser=require('cookie-parser');

const port=process.env.PORT || 8000;

dotenv.config({ path:'./.env'});


const db =mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

});

const publicDirectory=path.join(__dirname,'./public');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','hbs');

db.connect( (error) => {
 if(error){
     console.log(error)
 }else{
     console.log("MYsql connected...")
 }
})

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(port,()=>{
 console.log(`server started on port ${port}`);
})