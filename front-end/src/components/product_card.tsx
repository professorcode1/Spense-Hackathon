import * as React from "react"
import { IProductScreen } from "../types/API"


const ProductCard:React.FC<{product_data:IProductScreen}> = (props) => {
    return <div className="h-full w-full cursor-pointer	">
        <div className="h-[70%] flex justify-center p-2  border-b border-slate-400 ">
            <img src={props.product_data.product_images[0].location_as_url} className="object-contain h-full " />
        </div>
        <div className=" flex flex-col ml-2 h-[30%]  overflow-clip">
            <div className="flex text-xl">
                &#8377; <p>{props.product_data.products.price.toLocaleString()}</p>
            </div>
            <div className="line-clamp-3">

            <p className="text-sm text-clip">
                {props.product_data.products.name}
            </p>
            </div>

        </div>
    </div>;
}

export default ProductCard;