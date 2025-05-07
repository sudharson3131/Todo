const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=> console.log("DB Sucess"))
.catch(()=> console.log("DB Failed"))

//create model

const Fruit = mongoose.model("Fruit",{name:String},"fruit")

app.get("/fruitlist", function(req, res) {

  Fruit.find().then(function(retdata){
    console.log(retdata);
    res.send(retdata); 
  })
  
});

app.post("/addfruit",function(req,res){
   var newfruit = req.body.newfruit

   const newFruit = new Fruit(
    {
      name:newfruit
    }
   )
   newFruit.save().then(()=>console.log("saved sucessfully"))
   
})

app.delete("/deletefruit/:id", function(req, res) {
  const id = req.params.id;

  Fruit.deleteOne({_id: id})
    .then(() => {
      console.log("Deleted successfully");
      res.send({message: "Deleted successfully"});
    })
    .catch((err) => {
      console.log("Delete failed", err);
      res.status(500).send({message: "Delete failed"});
    });
});




app.listen(5001, function() {
  console.log("server started....");
});
