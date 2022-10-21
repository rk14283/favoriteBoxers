const express = require("express");
const app = express();

app.use(express.json())
const PORT = process.env.PORT || 5000;

const boxers = [
{id:1, name:"Thomas Hearns"},
{id: 2, name: "Roberto Duran"}, 
{id: 3, name: "Sugar Ray Leonard"},
{id: 4, name: "Marvelous Marvin Hagler"}
]

app.get("/boxers", (req,res) =>
{
    res.json(boxers); 
})


app.get("/", (req,res) =>{
    res.send("This is the night of champions")
})
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

