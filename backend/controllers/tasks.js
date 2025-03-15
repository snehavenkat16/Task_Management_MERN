const tasks = require('../models/tasks');

const taskController = {

    create : async (req, res) => {
        try{
            const {taskName , description, dueDate} = req.body;
            if(!taskName || !dueDate){
                return res.status(400).json({msg: "Please enter all the required fields"});
            }
            const newTask = await new tasks({taskName,description,dueDate});
            const task = await newTask.save();
            res.status(200).json({ msg: "Successfully Created the Task" });
        }catch(error){
            console.log(error);
            res.status(500).json({ msg: "Error while creating the task" });
        }
    },

    getAllTasks : async (req,res) =>{
        try{
            const allTasks = await tasks.find({});
            if(!allTasks){
                return res.status(400).json({msg:"Tasks are Not Found"});
            }
            res.status(200).json(allTasks);
        }catch(error){
            console.log(error);
            res.status(500).json({ msg: "Error while retrieve all tasks" });
        }
    },

    updateTask : async (req,res) =>{
        try{
            const taskId = req.params._id;
            const {taskName , description, dueDate} = req.body;
            if(!taskId){
                return res.status(400).json({msg:"Task Id is Not Found"});
            }

            const task = await tasks.findOneAndUpdate({_id: taskId},{taskName,description,dueDate});
            res.status(200).json({ msg: "Successfully Updated the Task" });
        }catch(error){
            console.log(error);
            res.status(500).json({ msg: "Error occured while updating the task" });
        }
    },

    deleteTask : async (req,res) =>{
        try{
            const taskId = req.params._id;
            if(!taskId){
                return res.status(400).json({msg:"Task Id is Not Found"});
            }
            const task = await tasks.findOneAndDelete({_id: taskId});
            res.status(200).json({ msg: "Successfully Deleted the Task" });
        }catch(error){
            console.log(error);
            res.status(500).json({msg:"Error Deleting the Task"})
        }
    }
}

module.exports = taskController;