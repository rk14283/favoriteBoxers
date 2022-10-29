const express = require("express");
const app = express();
const z = require("zod"); 


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

const Boxer = z.object({
    name: z.string().min(2),
    weight: z.string().min(2),
}); 


app.post("/boxers", (req,res) => {
    try{

        
        const validatedInput = Boxer.parse(req.body); 
        console.log(validatedInput); 
        
        const newBoxer = {
            id: boxers.length +1, 
            name: req.body.name,
            weight: req.body.weight 
        }
        boxers.push(newBoxer)
        //201 means created
        res.status(201).json({message:"New boxer added to the hall of fame"})
    }
    catch(error){
        console.log(error.issues, error.name); 

        if (error.name ==="ZodError"){
            return res
            .status(400)
            .json({message:"validation error", errors:error.issues});
        } else{
            return res.status(500).json({message:"Something went wrong sorry!"})
        }
    }
}); 


app.patch("/boxers/:id", (req,res)=>{
    const boxer = findBoxerByID(Number(req.params.id));
    
    //I needed this as well
    const validatedInput = Boxer.parse(req.body); 
    console.log(validatedInput); 

    // let key = z.object({
    //     name: z.string().min(2),
    //     weight: z.string().min(2),
    // }); 
    for (key in req.body){
        console.log("KEY", key); 
        boxer[key] = req.body[key]; 
    }
    
    res.json(boxer); 

 });




app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})



function findBoxerByID(boxerId){
    return boxers.find((boxer) => boxer.id ===boxerId)}


