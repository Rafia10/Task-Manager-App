import mongoose from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import { TaskStatusType } from "../Enums/status.js";
import { ObjectId } from "bson";
const Task= new mongoose.Schema(
  {
    title: { type: String,required:true },
    description: { type: String, required: true },
    dueDate:{type:String,required:true},
    assignee:{type:ObjectId,required:true,default:null},
    priority:{type:String,required:true},
    status:{type:String,enum:TaskStatusType, default:TaskStatusType.TODO}
  }, {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  })
  Task.virtual("id").get(function () {
    return this._id.toHexString();
  });
  Task.set("toJSON", {
    virtuals: true,
  });
  
  Task.plugin(paginate);
  
export default mongoose.model("Task", Task);