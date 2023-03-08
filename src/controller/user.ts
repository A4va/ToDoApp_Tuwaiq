import { prisma } from '../config/db'
import { Request, Response} from 'express';
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'





const add = async (req:Request, res:Response)=> {
    let hash = await argon2.hash(req.body.password)
    req.body.password = hash
    try {
        const user = await prisma.user.create({data: req.body})
        user && res.status(200).json(user)
    } 
    catch (err) {res.status(500).json({Error: err})}
};

const getAll = async (req:Request, res:Response)=> {
    try {res.status(200).json(await prisma.user.findMany({}))} 
    catch (err) {res.status(500).json({Error: err})}
};

const login = async (req :Request, res:Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email:email}})
        if(!user){
           return res.status(400).json({
                msg:"wrong email"
            }) 
        }else if (!await argon2.verify(user.password , password)){
            return res.status(400).json({
                msg:"wrong password"
            }) 
        } 
        const enToken = jwt.sign({id: user.id}, process.env.API_SECRET as string, {expiresIn:'3h'});
        return res.status(200).json({msg:`Welcome Back ${user.name}!`, token:enToken})
    } catch (err) {res.status(500).json({Error: err})}
}

// Update User
export const update = async (req :Request, res:Response) => {
    try {
        const {id} = res.locals.user
        const {name, password} = req.body
        const hash = await argon2.hash(password)
        const updated = await prisma.user.update({
          where: {id: id,},
          data: {name:name, password:hash}
        });
        !updated ? res.json({msg:`id is wrong`}) 
        :res.json({msg:"Updated is done !", updated:updated});
    } catch (err) {res.status(500).json({Error: err})}
  };

export const remove = async (req :Request, res:Response) => {
    try {
        const {id} = res.locals.user
        let deleted = await prisma.user.delete({where: {id: id}});
        !deleted ? res.json({msg:`id is wrong`}) 
        :res.json({msg:"Deleted is done !", deleted: deleted});
    } catch (err) {res.status(500).json({Error: err})}
  };


export default {
    add,
    getAll,
    login,
    update,
    remove
}