const express = require('express')
const app=express()
//const path = require('path')
const routing=require('./router')
const bodypaser=require('body-parser')
const encode=bodypaser.urlencoded({extended:false})
const MongoClient= require('mongodb').MongoClient
const url='http://mongodb://localhost:27017/'

app.use(routing)
app.use('/index.html',express.static(__dirname+"public"))


app.get('/',(req,res)=>{   
    res.sendFile(__dirname+'/public/index.html')   
})
app.get('student_detail',(req,res)=>{   
    res.sendFile(__dirname+'/student.html')   
})

app.post("/student_detail",encode,(req,res)=>{
    
    let obj={
        name:req.body.name,
        mobno:req.body.mobile,
        email:req.body.email
    }
    MongoClient.connect(url,(err,dbs)=>{
        let db=dbs.db("student_d")
        db.collection("studentdata").insertOne(obj)
        db.collection("studentdata").find({}).toArray((err,result)=>{
            for(let i=0;i<=result.length;i++){
                res.write("<h1>"+result[i].mobno+"</h1>")
            }
            
            
        })
    })
})

app.listen(2000) 