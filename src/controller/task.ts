import { prisma } from "../config/db";
import { Request, Response} from 'express';

const add = async (req:Request, res:Response)=> {
    try {
        const task = await prisma.task.create({data: req.body})
        task && res.status(200).json(task)
    } 
    catch (err) {res.status(500).json({Error: err})}
};


const getAll = async (req:Request, res:Response)=> {
    try {res.status(200).json(await prisma.task.findMany({}))} 
    catch (err) {res.status(500).json({Error: err})}
};

const byId = async (req:Request, res:Response)=> {
    try {
        const task = await prisma.task.findMany({where: {userID: req.params.id}, select:{title:true, isCompleted:true}})
        task && res.status(200).json(task)
    } 
    catch (err) {res.status(500).json({Error: err})}
};

const update =  async (req:Request, res:Response)=>{
    try{
        const tasks = await prisma.task.updateMany({
            where: {
                id:req.params.id,
                userID: req.body.userID
            },
            data: {title: req.body.title, isCompleted: req.body.isCompleted}
        }) 
        tasks.count !== 0 && res.status(200).json(tasks);
    } catch(err) {res.status(500).json({Error: err})}
    
}

const remove =  async (req:Request, res:Response)=>{
    try{
        const tasks = await prisma.task.deleteMany({
            where: {
                id:req.params.id,
                userID: req.body.userID
            },
        }) 
        if(tasks.count == 0)  {throw('No record deleted')}
        return res.status(200).json(tasks);
    } catch(err) {res.status(500).json({Error: err})}
    
}

export default {
    add,
    getAll,
    byId,
    update,
    remove
}