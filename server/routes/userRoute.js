const express=require('express')

const {create,read,getDataById,update,deleteUser}=require('../controller/userController')

const route=express.Router();

route.post('/post',create);
route.get('/get',read);
route.get('/getDataById/:id',getDataById);
route.put('/update/:id',update);
route.delete('/delete/:id',deleteUser);
module.exports=route