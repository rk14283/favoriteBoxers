const express = require("express");
const app = express();



app.use(express.json()) //"use" ing middleware
const PORT = process.env.PORT || 5000;

let boxers = [
{id:1, name:"Thomas Hearns", weight:"welterweigt"},
{id: 2, name: "Roberto Duran", weight: "lightweight"}, 
{id: 3, name: "Sugar Ray Leonard", weight: "welterweight"},
{id: 4, name: "Marvelous Marvin Hagler", weight: "middleweight"}
]


//GET /
app.get("/", (req,res) =>{
    res.send("This is the night of champions")
})


//READ 
//how are these two different 
//GET for all boxers
app.get("/boxers", (req,res) =>
{
    res.json(boxers); 
})

//READ
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


//DELETE
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


//CREATE
//POST Boxers 
app.post("/boxers", (req,res) => {
    console.log("Are we getting a post request?", req.body); 
    const newBoxers = {id: boxers.length+1, name:req.body.name, weight:req.body.weight};
    boxers.push(newBoxers)
    //201 means created
    res.status(201).json({message:"New boxer added to the hall of fame"})
}); 


app.patch("/boxers/:id", (req,res)=>{
    const boxer = findBoxerByID(Number(req.params.id));

    //update boxer ->current boxer, data from the request
    //combine the 2

    if(!boxer){
        return res.status(404).json({message:"boxer not found"}); 
    }
    console.log("CURRENT BOXER:", boxer, "DATA FROM THE REQUEST", req.body);
    
    //combine 2 things, current boxer + data from the request
    //this will change only the name    
    //boxer.name =req.body.name; 
   
    for (key in req.body){
        //this is for testing which key is it 
        console.log("KEY", key); 
        //key can be boxer name or boxer weight 
        //if we are sending name we will update it
        boxer[key] = req.body[key]; 
    }
    res.json(boxer); 

})

function findBoxerByID(boxerId){
    return boxers.find((boxer) => boxer.id ===boxerId)
}

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})

