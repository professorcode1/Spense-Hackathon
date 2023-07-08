import { Request, Response } from "express"
import knex_connection from "./connection"
import { StatusCodes } from "http-status-codes";
import { sleepAsync } from "../utils/sleep";
export async function get_random_products(req:Request, res:Response) {
    try{
        const number_of_products = Number((await knex_connection("product").count("*"))[0].count);
        const number_of_random_products = req.query.number_of_random_products || 10;
        const random_product_ids = new Array(number_of_random_products).fill(0).map(x => 
            Math.floor(Math.random() * (number_of_products - 1)) + 1 )
        console.log(number_of_products, random_product_ids)
        const products = await knex_connection("product").select("*").whereIn("id", random_product_ids);
        const product_images = await knex_connection("product_images").select("*").whereIn("product_id", random_product_ids);
        return res.send({products, product_images});
    }catch(error){
        console.log(error)
        res.sendStatus(StatusCodes.BAD_GATEWAY)
    }
}