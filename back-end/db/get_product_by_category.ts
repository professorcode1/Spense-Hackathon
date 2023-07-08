import { Request, Response } from "express"
import knex_connection from "./connection"
import { StatusCodes } from "http-status-codes";
import { sleepAsync } from "../utils/sleep";
import type {IProductScreen} from "../../front-end/src/types/API"
import type {IProduct, IProductImages} from "../../front-end/src/types/database"
export async function get_products_by_category(req:Request, res:Response) {
    try{
        const products_arr = await knex_connection("product").select("*").where("category_id", req.query.category_id) as IProduct[];
        const product_ids = products_arr.map(p => p.id)
        const product_images = await knex_connection("product_images").select("*").whereIn("product_id", product_ids) as IProductImages[]
        const result:IProductScreen[] = products_arr.map(products => {
            return {
                products,
                product_images : product_images.filter(product_img => product_img.product_id === products.id)
            }
        }).filter(x => x.product_images.length > 0)
        return res.send(result);
    }catch(error){
        console.log(error)
        res.sendStatus(StatusCodes.BAD_GATEWAY)
    }
}