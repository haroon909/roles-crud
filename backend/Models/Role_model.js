const mongoose = require("mongoose");


const Role_Model = mongoose.Schema(

    {
        roleName:{
            type:String,
            required:[true,"User role must be filled"]
        },
        status:{
            type:String,
            required:[true,"status must be defined !!"]
        }
    }

)


const M_Roles = mongoose.model("Roles",Role_Model)


module.exports = {M_Roles}