const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req,res) =>
{
    res.send("server working ")
})

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)

})

