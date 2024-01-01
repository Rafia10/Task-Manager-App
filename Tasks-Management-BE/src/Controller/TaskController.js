import Task from "../Model/Task.js";
import mongoose from "mongoose";
import { io } from "../../server.js";
export const createTask = async (req, res) => {
  try {
    const body = req.body;
    const newTask = new Task(body);
    await newTask.save();
    io.emit('taskUpdated',newTask)
    res.status(201).json({ message: "Task Added Successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Failed to add task" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const bodyParams = req.body;
    const Id = req.params.id;
    const updateTask = await Task.findOneAndUpdate(
      { _id: { $ne: new mongoose.Types.ObjectId(Id) } },
      {
        $set: bodyParams,
      },
      { new: true }
    );
    if(!Id){
      res.status(400).json({message:"Id is required"})
      return
    }
    io.emit('taskUpdated',updateTask)

    res
      .status(201)
      .json({ message: "Task Updated Successfully", data: updateTask });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const Id = req.params.id;
    const task = await Task.findOneAndDelete({
      _id: Id,
    });
    if(!Id){
      res.status(400).json({message:"Id is required"})
      return
    }
    io.emit('taskUpdated',task)

    res.status(201).json({ message: "Task Deleted Successfully", data: task });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Failed to delete task" });
  }
};

export const viewTask = async (req, res) => {
  try {
    const Id = req.params.id;
    const task = await Task.findOne({
      _id:new mongoose.Types.ObjectId(Id)
    });
    if(!Id){
      res.status(400).json({ error: "Id id required" });

      return
    }

    res.status(200).json({ message: "Task Fetched Successfully", data: task });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Failed to Fetch task" });
  }
};

export const listTask = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  try {
    const tasks = await Task.aggregate(
      [
        {
      $lookup:{
        from:"users",
        localField:"assignee",
        foreignField:"_id",
        as:"userInfo",
        pipeline:[
            {
                $project:{
                    username:1
                }
            },
            
        ]
      }

    },
    
    {
        $unwind:"$userInfo"
    },
    
    { $limit: parseInt(limit) }
])
   const totalDocs = await Task.countDocuments();

   const totalPages = Math.ceil(totalDocs / limit);
   const pagination = {
     totalDocs,
     totalPages,
     page: parseInt(page),
     limit: parseInt(limit),
     hasNextPage: page < totalPages,
     hasPrevPage: page < 1,
     nextPage: page < totalPages ? parseInt(page) + 1 : null,
     prevPage: page > 1 ? parseInt(page) - 1 : null,
   };
   const result = {
    tasks,
    pagination,
  };
     res.status(200).json({message:"Tasks Fetched Successfully",result});
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Failed to Fetch tasks" });
  }
};
// export const listTask = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
// try {
//   const tasks = await Task.paginate({},{
//     page:req.query.page||1,
//     limit:req.query.limit||10
//   })
//  res.status(200).json({message:"Tasks Fetched Successfully",tasks});
// } catch (e) {
//   console.log(e);
//   res.status(400).json({ message: "Failed to Fetch tasks" });
// }
// };