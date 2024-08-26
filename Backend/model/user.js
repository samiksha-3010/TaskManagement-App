import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        unique:true,
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks:[{
        type:mongoose.Types.ObjectId,
        ref:"Tasks"
    }]

})

export default mongoose.model("User", userSchema)