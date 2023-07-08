
import express, { Router } from "express"
import knex_connection from "./connection"
import { get_category } from "./get_category"
import {get_random_products}  from "./get_random_products"
import { get_products_by_category } from "./get_product_by_category"
const db_router:Router = express.Router()

db_router.get("/category", get_category)
db_router.get("/random_product", get_random_products)
db_router.get("/get_products_by_category", get_products_by_category)
export {db_router}

export default knex_connection