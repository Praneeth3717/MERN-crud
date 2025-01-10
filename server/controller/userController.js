const userModel=require('../model/userModel.js')

const create=async(req,res)=>{
    try {
        const createUser=new userModel(req.body);
        const {email}=createUser;

        const userExist=await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exist"});
        }
        const saveData=await createUser.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const read=async(req,res)=>{
    try {
        const readData=await userModel.find();
        if(readData.length===0){
            return res.status(404).json({message:"No Date found in DataBase"})
        }
        res.status(200).json(readData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const getDataById=async(req,res)=>{
    try {
        const id=req.params.id;
        const getUserById=await userModel.findById(id);
        if(!getUserById){
            return res.status(404).json({message:"No user found"})
        }
        res.status(200).json(getUserById);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const update=async(req,res)=>{
    try {
        const id=req.params.id;
        const foundUser=await userModel.findById(id);
        if(!foundUser){
            return res.status(404).json({message:"No user found"})
        }
        const updateUser=await userModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
    const findUser=await userModel.findById(id);
    if(!findUser){
        return res.status(404).json({message:"User not found"})
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({message:"User Deleted"})
}

module.exports={create,read,getDataById,update,deleteUser}