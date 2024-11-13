//==========================Dependencies==============================//
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors  = require("cors");
app.use(cors())



const {DB_Connection} = require('./Config/DB_Connection')
//====================================================================//
//                                ||
//====================Registration API requests ======================//

const {
  Get_Role,
  Post_Role,
  Update_Role,
  Delete_Role,
} = require("./Controllers/Roles");



app.route("/Roles").get(Get_Role).post(Post_Role);



app.route("/Roles/:id").delete(Delete_Role).put(Update_Role);




//====================================================================//
//                                ||
//===============================PORT=================================//

app.listen(process.env.PORT, function () {
  console.log(`Server is running on Port: ${process.env.PORT}`);
  DB_Connection();
});
//====================================================================//
