import * as React from "react"
import Navbar from "../components/navbar"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { IProductScreen } from "../types/API"
import ProductCard from "../components/product_card"
import { setProduct } from "../redux/product"
import { setScreen } from "../redux/screen"
import TopBar from "../components/top_bar"
const InternalScreenImplementation:React.FC<{}> = () => {
    const product_list:IProductScreen[] = useAppSelector(s => s.productList)
    const dispatcher = useAppDispatch()
    const LoadProductScreen = (product:IProductScreen) => {
        dispatcher(setProduct(product))
        dispatcher(setScreen("Product"))
    }
    return (
        <div className="h-screen w-full relative  " >
           <div className="flex flex-wrap align-center items-center justify-around" >
           
           {product_list.map((product_data,index) => 
           
            <div 
                className="h-80 w-64  bg-white my-4 border border-slate-400 "  
                key={`product-list-key${index}`}
                onClick={() => LoadProductScreen(product_data)}
            >
                <ProductCard product_data={product_data} />
            </div>
           
           )}
           
           </div>
        </div>
    )
}
const ProductsList:React.FC<{}> = () => {

    return <div className="h-screen w-screen relative overflow-y-clip " >
        <Navbar />
        <TopBar />
        <div className="h-screen pl-12 pt-12 overflow-x-auto">
            <InternalScreenImplementation />
        </div>
    </div>
}

export default ProductsList