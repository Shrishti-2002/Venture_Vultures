const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const app=express();

dotenv.config({path:'./config.env'});
require("./DB/Conn");

const User=require("./model/userSchema");
app.use(express.json());
app.use(require('./router/auth'))