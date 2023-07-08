import * as React from "react"
import { IProductScreen } from "../types/API"

const ProductCard:React.FC<{product_data:IProductScreen}> = (props) => {
    return <div className="h-full w-full overflow-clip">
        <div className="h-[70%] flex justify-center py-2  border-b border-slate-400">
            <img src={props.product_data.product_images[0].location_as_url} className="object-contain h-full bg-slate-400" />
        </div>
        <div className=" flex flex-col ml-2 ">
            <div className="flex text-xl">
                &#8377; <p>{props.product_data.products.price.toLocaleString()}</p>
            </div>
            <div className="text-ellipsis ">

            <p className="text-sm ">
                {props.product_data.products.name}
            </p>
            </div>

        </div>
    </div>;
}

export default ProductCard;