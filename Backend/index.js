import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors'
import morgan from "morgan"
import { addTask, deleteTask, getTask, updateTask } from "./Routes/List.js"
import { Login, Register } from "./Routes/Authc.js";
import { createSubscription } from "./Routes/Payment.js"






const app = express();


// app.set('view engine', 'ejs')

app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res) => {
  res.send("working Your Server..")
})
app.post("/register",Register)
app.post("/login",Login)
app.post("/add-task",addTask)
app.put("/update-task/:id",updateTask)
app.delete("/delete-task/:id",deleteTask)
app.get("/get-task/:id",getTask)




app.post("/create-Subscription",createSubscription)



mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})