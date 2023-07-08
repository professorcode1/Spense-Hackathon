import { Request, Response } from "express";
import knex_connection from "../db/main";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { generateAccessToken } from "./generateAccessToken";
import { IUsers } from "../../front-end/src/types/database";
import knex from "knex";
export const login_callback = async (req:Request, res:Response) => {
    const email:string = req.body.email;
    const password_submitted:string = req.body.password;
    try {
        const passwords_array:any[] = await knex_connection("users").where('email', email).select('password')
        if(passwords_array.length === 0){
            return res.status(StatusCodes.NOT_FOUND).send({message:`The user with the email ${email} does not exist`});
        }
        const hashed_password_in_db = passwords_array[0].password;
        const passwords_match = bcrypt.compareSync(password_submitted, hashed_password_in_db)
        if(!passwords_match){
            return res.status(StatusCodes.UNAUTHORIZED).send({message:"Password is incorrect"});
        }
        const user:IUsers = (await knex_connection.select("*").from("users").where("email", email))[0]
        delete user.password
        const token = generateAccessToken({id :user.id}, process.env.ACCESS_TOKEN_SECRET as string)
        const user_addresses = await knex_connection("user_addresses").select("*").where("user_id", user.id)
        return res.status(StatusCodes.ACCEPTED).send({token, user, user_addresses, user_address_index:0})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_GATEWAY).send({message:"Something went wrong on the server."});
    }
}