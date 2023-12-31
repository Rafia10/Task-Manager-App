import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userValidatorSchema from "../Validators/validate.js";
export const signUp = async (req, res) => {
  try {
    const { error, value } = userValidatorSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const checkIfexistingUser = await User.findOne({ email: value?.email });
    if (checkIfexistingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const addNewUser = new User(value);
    await addNewUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Invalid Credentials" });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = userValidatorSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const {email,password}=value
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const comparePass = await bcrypt.compare(password, user?.password);
    if (!comparePass) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = await jwt.sign({ user }, process.env.SECRET_KEY);
    res.status(200).json({ message: "LoggedIn Successful", data: token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Invalid Credentials" });

  }
};

export const listUsers= async(req,res)=>{
  try{
    const users=await User.aggregate([
      {
        $project:{
          username:1
        }
      }
     
    ])
    res.status(200).json({message:"Users list",data:users})

  }
  catch(e){
    console.log(e)
    res.status(400).json({error:"Users list"})
  }

}