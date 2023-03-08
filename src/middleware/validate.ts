import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from "express";
import { ZodError } from 'zod/lib';

const validate = (schema: AnyZodObject) => (req:Request, res:Response, next:NextFunction) =>{
    try{
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        })
        next();
    }catch(err){
        const zodErr = err as ZodError;
        return res.status(400).json({
            message: zodErr.errors[0].message,
        })
     }
}

export default validate;