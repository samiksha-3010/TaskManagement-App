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
    const { id } = req.params; // Extract task ID from URL parameters
    const { title, body } = req.body; // Extract task details from request body

    if (!title || !body) {
      return res.status(400).json({ message: "Title and Body are required" });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, body },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Successfully updated
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteTask = async(req , res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { tasks: req.params.id }
    });

    if (existingUser) {
      await Task.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Task Deleted" });
    } else {
      return res.status(404).json({ message: "User or Task not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// export const deleteTask = async (req, res) => {
//   try {
//     const taskId = req.params.id; // Task ID from URL parameters
//     const userId = req.body.id;   // User ID from request body

//     if (!taskId || !userId) {
//       return res.status(400).json({ message: "Task ID and User ID are required" });
//     }

//     // Pull the task ID from the user's tasks array
//     const existingUser = await User.findByIdAndUpdate(
//       userId,
//       { $pull: { tasks: taskId } },
//       { new: true } // Return the updated user document
//     );

//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Delete the task from the Task collection
//     const deletedTask = await Task.findByIdAndDelete(taskId);

//     if (!deletedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json({ message: "Task Deleted" });
//   } catch (error) {
//     console.error("Error in deleteTask:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };








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