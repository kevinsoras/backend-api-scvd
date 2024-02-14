import { NextFunction, Request, Response } from "express"
import { ZodError, ZodIssue, ZodSchema } from "zod"
import { ErrorResponse } from "../utils"

export function validateSchema<T>(schema:ZodSchema<T>){
  return async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const body= schema.parse(req.body)
      req.body=body
      next()
    } catch (error) {
      if(error instanceof ZodError){
        const formatted=formattedError(error.issues)
        return next(new ErrorResponse('Error Validation Schema',400,formatted))
      }
      //otro error
      return next(new ErrorResponse('Error Validation Schema',500))
    }
  }
}
const formattedError=(errors:ZodIssue[]):Record<string,string>=>{
  let formatted:Record<string,string>={}
  for(let error of errors){
    formatted[error.path.length>0 ? error.path.join('.') :'schema']=error.message
  }
  return formatted
}