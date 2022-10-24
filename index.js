const express = require("express");
const app = express();



app.use(express.json()) //"use" ing middleware
const PORT = process.env.PORT || 5000;

const boxers = [
{id:1, name:"Thomas Hearns"},
{id: 2, name: "Roberto Duran"}, 
{id: 3, name: "Sugar Ray Leonard"},
{id: 4, name: "Marvelous Marvin Hagler"}
]

//GET /students 
app.get("/boxers", (req,res) =>
{
    res.json(boxers); 
})

GET /
app.get("/", (req,res) =>{
    res.send("This is the night of champions")
})

//GET /boxers/:id
//route parameter -> :id 
app.get("/boxers/:id", (req,res)=>{
    console.log("Hi", Number(req.params)); 
    const boxer = boxers.find(
        (boxer) => boxer.id === Number(req.params.id)
    );
    res.json(boxers); 
}); 



//POST Boxers 
app.post("/boxers", (req,res) => {
    console.log("Are we getting a post request?", req.body); 
    const newBoxers = {id: boxers.length+1, name:req.body.name};
    boxers.push(newBoxers)
    //201 means created
    res.status(201).json({message:"New boxer added to the hall of fame"})
}); 



app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})

