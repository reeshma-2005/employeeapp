// Task1: initiate app and run server at 3000
/*my codes*/
var express=require("express");
var Bodyparser=require("body-parser");
var Mongoose=require("mongoose");
var Cors=require("cors");
var app=new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));

app.listen(3000,()=>{
    console.log("sever set up");
});
/*my code end*/


 const path=require('path');
 app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
 
   Mongoose.connect("mongodb+srv://reeshmasreenath81:reeshmasreenath81@cluster0.j6gueyg.mongodb.net/EmployeeDb?retryWrites=true&w=majority",
    {useNewUrlParser:true}
 );

  const employeeSchema=Mongoose.Schema(
    {
        name:String,
        location:String,
        position:String,
        salary:Number
    
    }
  );

  var employeeModel=Mongoose.model("Employees", employeeSchema);
 //module.exports {employeeModel};
  //module.exports(employeeModel); 
  

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
    //res.send("welcome");
    employeeModel.find(
        (err,data)=>{
            if (err) {
                res.json({"status":"Error","Error":err})
            } else {
               res.json(data)  
            }
        }
    )

})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    var id=req.params.id;
    var data=req.body;
    employeeModel.findById(id,(err,data)=>{
        if (err) {
           
           res.json({"status":"Error","Error":err})
        } else {
            res.json(data);
        }
    })
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    
    var data=req.body;
    var employee2=new employeeModel(data);
    await employee2.save(
        (err,data)=>{
            if (err) {
                res.json({"status":"Error","Error":err})
            } else {
               res.json({"Status":"Success","Data":data})  
            }
        }
    )
    
    console.log(data);

});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    
    var id=req.params.id;
    var data=req.body;
    employeeModel.findByIdAndDelete(id,(err,data)=>{
        if (err) {
                            
           res.json({"status":"Error","Error":err})
        } else {
            res.json({"Status":"Deleted","Data":data});
        }
    })
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{
    var name=req.body.name;
    var data=req.body;
    employeeModel.findOneAndUpdate(
        {
            "name":name
        },data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
    )
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



