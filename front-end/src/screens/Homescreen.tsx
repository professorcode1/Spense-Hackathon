import * as React from "react"
import Navbar from "../components/navbar"
import { useAppSelector } from "../redux/hooks"
import axios from "axios"
import { REQUEST_BASE_URL } from "../types/constants"
import { IProduct, IProductImages } from "../types/database"
import PleaseWait from "../components/please_wait"
import womanInHeadphone from "../../public/woman in headphones.jpg"
import { useAutoAnimate } from '@formkit/auto-animate/react'
interface IRandomProduct{
    products:IProduct[]
    product_images:IProductImages[]
}

const InternalScreenImplementation:React.FC<{}> = () => {
    const [data, setData] = React.useState<IRandomProduct|null>(null);
    React.useEffect(() => {
        (async () => {
            const result = (await axios.get<IRandomProduct>(REQUEST_BASE_URL + "/random_product", {
                params:{
                    number_of_random_products:1
                }
            })).data
            setData(result)
        })()
    }, [])
    if(!data){
        return <PleaseWait />
    }
    return (
        <div className="h-screen overflow-clip w-full relative" style={{
        }}>
            <img src="woman in headphones.jpg" className="absolute top-0 left-0"  style={{objectFit:"cover"}}  />
            <div className="h-full w-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center" style={{
                backgroundColor:"rgba(25,25,25,0.8)"
            }}>
                <img src="spense logo with name.png" className="h-[40%]" />
                <div>
                    <p className="text-white text-5xl ">
                        Here to meet all your needs :)
                    </p>
                </div>
            </div>
        </div>
    )
}
const Homescreen:React.FC<{}> = () => {

    return <div className="h-screen w-screen relative" >
        <Navbar />
        <div className="h-screen pl-12">
            <InternalScreenImplementation />
        </div>
    </div>
}

export default Homescreen