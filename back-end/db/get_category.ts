import { Request, Response } from "express"
import knex_connection from "./connection"
import { StatusCodes } from "http-status-codes";
import { sleepAsync } from "../utils/sleep";
export async function get_category(req:Request, res:Response) {
    try{
        const data = await knex_connection("category").select("*");
        // await sleepAsync(5000)
        return res.send(data);
    }catch(error){
        res.sendStatus(StatusCodes.BAD_GATEWAY)
    }
}