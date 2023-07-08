import { Request, Response } from "express";
import knex_connection from "../db/main";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { generateAccessToken } from "./generateAccessToken";
import {IUsers} from "../../front-end/src/types/database"
const HASHING_ROUNDS_FOR_PASSWORD = 10;
export const register_callback = async (req:Request, res:Response) => {
    const email:string = req.body.email; 
    const first_name:string = req.body.first_name; 
    const last_name:string = req.body.last_name; 
    const password:string = req.body.password;

    const address_line_1:string = req.body.address_line_1;
    const address_line_2:string = req.body.address_line_2;
    const address_line_3:string = req.body.address_line_3;
    const zipcode:string = req.body.zipcode;
    const city:string = req.body.city;
    const country:string = req.body.country;
    try {
        const user_email_count = (await knex_connection('users').count({count: '*'}).where({email}))[0] as number
        if (user_email_count > 0){
            return res.status(StatusCodes.NOT_ACCEPTABLE).send({
                message:`The user with the email ${email} already exists.`
            });
        }
        const hashedPassword = await bcrypt.hash(password, HASHING_ROUNDS_FOR_PASSWORD)
        const user_object:any = {
            email,
            first_name,
            last_name,
            password:hashedPassword
        }
        const user = (await knex_connection('users').returning(
            [
                "id",
                "email",
                "first_name",
                "last_name",
                "user_type",
                "coins"
            ]
        ).insert(user_object))[0] as IUsers
        const token = generateAccessToken({id :user.id}, process.env.ACCESS_TOKEN_SECRET as string)
        const user_address = {
            user_id : user.id,
            address_line_1,
            address_line_2,
            address_line_3,
            zipcode,
            city,
            country,
        }  
        const user_addresses = await knex_connection("user_addresses").returning("*").insert(user_address);
        return res.status(StatusCodes.ACCEPTED).send({token, user, user_addresses, user_address_index:0})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_GATEWAY).send({message:"Something went wrong on the server."});
    }
}