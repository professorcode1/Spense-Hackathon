import * as React from "react"
import { IProductScreen } from "../types/API"

const ProductCard:React.FC<{product_data:IProductScreen}> = (params) => {
    return <div onClick={() => {
        
    }}>
        Hello World
    </div>;
}

export default ProductCard;