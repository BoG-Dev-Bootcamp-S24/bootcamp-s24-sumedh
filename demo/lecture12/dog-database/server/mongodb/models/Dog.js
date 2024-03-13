import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,

    },
    age : {
        type: Number,
        require : true,
    },

    breed : String

}) 

export default mongoose.model("Dog", dogSchema)