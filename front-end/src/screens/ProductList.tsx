import * as React from "react"
import Navbar from "../components/navbar"
import { useAppSelector } from "../redux/hooks"
import axios from "axios"
import { REQUEST_BASE_URL } from "../types/constants"
import { IProduct, IProductImages } from "../types/database"
import PleaseWait from "../components/please_wait"
import womanInHeadphone from "../../public/woman in headphones.jpg"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IProductScreen } from "../types/API"
interface IRandomProduct{
    products:IProduct[]
    product_images:IProductImages[]
}

const InternalScreenImplementation:React.FC<{}> = () => {
    const product_list:IProductScreen[] = useAppSelector(s => s.productList)
    return (
        <div className="h-screen overflow-clip w-full relative" style={{
        }}>
            {JSON.stringify(product_list)}
        </div>
    )
}
const ProductsList:React.FC<{}> = () => {

    return <div className="h-screen w-screen relative" >
        <Navbar />
        <div className="h-screen pl-12">
            <InternalScreenImplementation />
        </div>
    </div>
}

export default ProductsList