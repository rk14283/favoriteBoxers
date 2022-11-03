const express = require("express");
const app = express();
const z = require("zod"); 
const { PrismaClient } = require("@prisma/client");
const  prisma = new PrismaClient(); 

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
app.get("/boxers", async (req,res) =>
{
    const boxers = await prisma.boxer.findMany(); 
    res.json(boxers); 
})

//READ
//GET /boxers/:id
//GET for 1 student 
//route parameter -> :id 
app.get("/boxers/:id", async (req,res)=>{
    //I do not need number because it is already in number, but if I use number I get NAN
    //console.log("Hi",req.params); 
    try { 
         const boxer = await prisma.boxer.findUniqueOrThrow({
        where: {id:Number (req.params.id)},
    })  
    
    res.json(boxer); 


    }

    catch(error){   
        console.log(error.name); 
         if(error.name ==="NotFoundError"){
        return res.status(404).json({message:"boxer not found"}); 
    }
    else{
        console.log(error); 
        return res.status(500).json({message:"something went wrong"});

    }

    }
  
}); 


//DELETE
//DELETE boxers ID
app.delete("/boxers/:id",async (req,res)=> {

    try{
        const boxer = await prisma.boxer.delete({
        where:{ id:Number(req.params.id) }, 
    }); 
    res.json({ message: "Boxer deleted" } ); 
} 
catch(error){ 
    
    if(error.code === "P2025"){
        return res.status(404).json({message:"boxer not found"}); 
    }else{
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });

    }
}
}); 


//CREATE
//POST Boxers 

const BoxerSchema = z.object({
    name: z.string().min(2),
    weight: z.string().min(2),
}).strict(); 



app.post("/boxers", async (req,res) => {
    try{
        const validatedInput = BoxerSchema.parse(req.body); 
        const newBoxer = await prisma.boxer.create ({ data: validatedInput }); 
        
        //201 means created
        res.status(201).json({ message:"New boxer added to the hall of fame", boxer: newBoxer });
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


app.patch("/boxers/:id", async (req,res)=>{
    try{
        const validatedInput = BoxerSchema.parse(req.body);
        //This was the main thing to fix, not key 
        const boxer = await prisma.boxer.update({

            where:{
                id: Number(req.params.id),
            },
            data: validatedInput, 

        }); 
        
        res.json(boxer); 

} catch(error){
    if (error.name ==="ZodError"){
        return res
        .status(400)
        .json({message:"validation error", errors:error.issues});
    } else if (error.code ==="P2025") {
        return res.status(404).json({message:"boxer not found"}); 
    }else {
        console.log("UNEXPECTED!", error); 
        return res.status(500).json({ message: "Something went wrong, sorry!" });
    }
}
 });




app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})





