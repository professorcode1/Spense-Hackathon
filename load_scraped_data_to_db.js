const csv = require('csv');
const fs = require("fs");
var path = require('path');
const http = require('http');
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const util = require("util")
const stream = require("stream")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bcrypt = require("bcrypt")
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : process.env.LOCALDBPASS,
      database : 'spensehackdb'
    }
  });
const number_of_vendors = 10;
const generateRandomVendorIndex = () => Math.floor(Math.random() * number_of_vendors)
const folder_loc_write_results = "D:\\New folder\\spenseHackImages";
const category_data_and_links = fs.readFileSync(path.join("amazon-scraper","category data and links.csv"))

const product_data_and_links = fs.readFileSync(path.join("amazon-scraper","product data and links.csv"));

async function write_to_file_from_url(url, folder_location){
    try {
        const file_name = uuidv4();
        const streamPipeline = util.promisify(stream.pipeline);
        const response = await fetch(url);

        if (!response.ok) return null;
        const file_type = url.substring(url.lastIndexOf('.'))
        const total_file_location = path.join(folder_location, file_name + file_type)
        await streamPipeline(response.body, fs.createWriteStream(total_file_location));
        return total_file_location
    } catch (error) {
        return null
    }

}

async function product_data_to_db(product_data, brand_dataframe, category_dataframe, brand_name_to_id_map){
    const [brand_id_in_df, product_name_, price, description_json, image_links_json, properties_json] = product_data
    const description = JSON.parse(description_json)
    // const image_locations_promises = JSON.parse(image_links_json).map(url => write_to_file_from_url(url, folder_loc_write_results)).filter(Boolean)
    const image_location_urls = JSON.parse(image_links_json)
    const metadata = JSON.parse(properties_json)
    const product_name = product_name_.trim()
    // const image_locations = []
    // for(const image_promise of image_locations_promises){
    //     image_locations.push(await image_promise);
    // }
    const brand_name = brand_dataframe[brand_id_in_df][2]
    const brand_id = brand_name_to_id_map.get(brand_name)
    const category_id = brand_dataframe[brand_id_in_df][1]
    const product = {
        name : product_name,
        description,
        category_id,
        brand_id ,
        price,
        margin : Math.floor((Math.random() * price) / 10.0), 
        metadata,
        vendor_id : generateRandomVendorIndex()
    }
    const product_id = (await knex("product").insert(product).returning("id"))[0].id
    try{
        await knex("product_images").insert(image_location_urls.map(location_as_url => {return {product_id,location_as_url }}))
    }catch(error){
        console.log("Big L")
    }

}


const load_product_category_and_brand = () => {
csv.parse(product_data_and_links, (err, product_dataframe) =>{
    product_dataframe.shift()
    csv.parse(category_data_and_links, async (err, category_dataframe) => {
        const db_insert_format_arr = []
        category_dataframe.shift()
        for(let row_index = 0 ; row_index < category_dataframe.length ; row_index++){
            const row = category_dataframe[row_index] 
            const db_insert_format = {
                id : row[0],
                category : row[1],
                subcategory : row[2],
                subsubcategory : row[3],
                compulsory_metadata_schema :{}
            }
            db_insert_format_arr.push(db_insert_format)
        }    
        console.log("starting push category")
        await knex("category").insert(db_insert_format_arr)
        console.log("done pushing category")
        const brand_data_and_links = fs.readFileSync(path.join("amazon-scraper","brand data and links.csv"))
        csv.parse(brand_data_and_links, async (err, brand_dataframe) => {
            brand_dataframe.shift();
            console.log("starting push to brand")
            const data_in_db_format = new Array(...(new Set(brand_dataframe.map(x => x[2])))).map(name => {return {name}})
            const ids = (await knex("brand").insert(data_in_db_format).returning('id')).map(x => x.id)
            const brand_name_to_id_map = new Map(
                ids.map((id,index) => [data_in_db_format[index].name, id]))
            console.log("pushing into brand done")
            console.log("pushing into product")
            console.log(brand_dataframe)
            for(let product_index = 0 ; product_index < product_dataframe.length ; product_index++){
                const product_data = product_dataframe[product_index]
                await product_data_to_db(product_data, brand_dataframe, category_dataframe, brand_name_to_id_map);
                console.log("progess :: ", (product_index *100)/product_dataframe.length )
            }
            console.log("pushing into products done")
        });
    });

    // console.log(brand_id, product_name, price,description, image_links, properties)
})
}

const create_vendors_and_load = async () => {
    const password_for_vendor = "vendorpassword"
    const hashed_pass = bcrypt.hashSync(password_for_vendor, 10);
    const users = []
    for(let vendor_index = 0  ; vendor_index < number_of_vendors ; vendor_index++){
        const id = vendor_index;
        const email = `vendor${vendor_index}@spense.com` 
        const first_name = "Vendor"
        const last_name = `Number ${vendor_index}`
        const password = hashed_pass;
        const user_type = 1;
        users.push({
            id,
            email,
            first_name,
            last_name,
            password,
            user_type
        })
    }
    await knex("users").insert(users)
    load_product_category_and_brand()
}

create_vendors_and_load()