import { NextFunction, Request, Response } from "express"
import { ErrorResponse } from "../utils"
import { Jwt } from "../utils/Jwt"

export const jwtValidation = ()=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    const token:string|undefined = req.headers['authorization']?.split(' ')[1]
    if(!token) return next(new ErrorResponse("Required Token",401))
    const jwt= new Jwt(process.env['JWT-KEY'] ?? '')
    const userData=jwt.validateToken(token)
    if(!userData) return next(new ErrorResponse("Invalid Token",401))
    res.locals['userData']=userData
    next()
  }
}