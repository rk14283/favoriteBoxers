const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 
const boxers = require("./boxers.json")
async function seedBoxers(){
    for(boxer of boxers){
            const result = await prisma.boxer.create({
        data:{
            name: boxer.name, 
            weight: boxer.weight,  
        },
    }); 
     console.log("SEEDED:", result); 
    }

   
}

seedBoxers(); 