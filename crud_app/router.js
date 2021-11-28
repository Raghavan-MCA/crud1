const express=require('express')
const router=express.Router()
const path= require('path')

router.get('/student_detail',(req,res)=>{
    res.sendFile(path.join(__dirname+'/student.html'))
})

module.exports=router