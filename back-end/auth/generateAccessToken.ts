import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
function generateAccessToken(user : {id : number}, token_secret : string) {
    return jwt.sign(user, token_secret)
}
import { StatusCodes } from "http-status-codes"

function authenticateUser(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
        // @ts-expect-error
        req.user = user; 
        next()
    }catch(err){
        return res.sendStatus(StatusCodes.FORBIDDEN)
    }
}

export {generateAccessToken, authenticateUser}