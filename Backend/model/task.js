import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({

    title:{
        type: String,
        required:true,
    }
    ,
    body:{
        type: String,
        required:true,
    }
    ,
    user:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
},
{timestamps:true}

)
export default mongoose.model("Tasks" , taskSchema)