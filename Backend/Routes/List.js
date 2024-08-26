import user from "../model/user.js";
import Task from "../model/task.js";

export const addTask = async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await user.findById(id);
    console.log(existingUser);

    if (existingUser) {
      const newTask = new Task({ title, body, user: existingUser });

      await newTask.save();

      existingUser.tasks.push(newTask);
      await existingUser.save();

      res.status(200).json({ task: newTask, user: existingUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const updateTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    
    // console.log(existingUser, "user");
    
      const list =await Task.findByIdAndUpdate(req.params.id, { title, body });
      list.save().then(()=>res.status(200).json({ message:"Task Updated" }))
     
      // });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async(req , res) => {
  try {
    const { id } = req.body
    const existingUser = await User.findByIdAndUpdate(
      id ,{$pull:{tasks:req.params.id}});
    if(existingUser){
      await Task.findByIdAndDelete(req.params.id).then(()=>
      res.status(200).json({ message:"Task Deleted" })
      )
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getTask = async(req , res) =>{
 try {
  const list = await Task.find({user:req.params.id}).sort({createdAt: -1})
  if(list.length !== 0){
   res.status(200).json({list:list})
 }else{
   res.status(200).json({message:"No task found"})
 }
 } catch (error) {
  console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
 }

}