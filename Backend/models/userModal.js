const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        require:true
    },
    lastname: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    role:{
        type:String,
        default:"user"
    }
},{
    timestamps:true,
}
)

module.exports = mongoose.model("User" ,userSchema )