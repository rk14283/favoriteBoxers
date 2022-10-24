const express = require("express");
const app = express();



app.use(express.json()) //"use" ing middleware
const PORT = process.env.PORT || 5000;

let boxers = [
{id:1, name:"Thomas Hearns"},
{id: 2, name: "Roberto Duran"}, 
{id: 3, name: "Sugar Ray Leonard"},
{id: 4, name: "Marvelous Marvin Hagler"}
]


//GET /
app.get("/", (req,res) =>{
    res.send("This is the night of champions")
})


//GET /boxers
//how are these two different 
//GET for all students 
app.get("/boxers", (req,res) =>
{
    res.json(boxers); 
})

//GET /boxers/:id
//GET for 1 student 
//route parameter -> :id 
app.get("/boxers/:id", (req,res)=>{
    //I do not need number because it is already in number, but if I use number I get NAN
    console.log("Hi",req.params); 
    const boxer = findBoxerByID(Number(req.params.id));

    if(!boxer){
        return res.status(404).json({message:"boxer not found"}); 
    }
    res.json(boxer); 
}); 


//DELETE boxers ID
app.delete("/boxers/:id",(req,res)=> {
    const boxer = findBoxerByID(Number(req.params.id))

    if(!boxer){
        return res.status(404).json({message:"boxer not found"}); 
    }

    console.log("Boxer to delete",boxer);

    //delete boxer
    boxers = boxers.filter((boxer)=>boxer.id !==Number(req.params.id)); 
    res.json({message: "Boxer deleted"})
}); 

//POST Boxers 
app.post("/boxers", (req,res) => {
    console.log("Are we getting a post request?", req.body); 
    const newBoxers = {id: boxers.length+1, name:req.body.name};
    boxers.push(newBoxers)
    //201 means created
    res.status(201).json({message:"New boxer added to the hall of fame"})
}); 



function findBoxerByID(boxerId){
    return boxers.find((boxer) => boxer.id ===boxerId)
}

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})

