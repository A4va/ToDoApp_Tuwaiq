import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: "minimal",
})

const connectDB = () => {
    try{
        prisma.$connect();
        console.log("database connection !".toUpperCase());
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

export { prisma, connectDB }