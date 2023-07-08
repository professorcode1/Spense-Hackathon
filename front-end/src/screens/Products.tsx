import * as React from "react"
import Navbar from "../components/navbar"
import { useAppSelector } from "../redux/hooks"
import { IProduct, IProductImages } from "../types/database"
import TopBar from "../components/top_bar"
const Images:React.FC<{images:IProductImages[]}> = (props) =>{
    const [imageIndex, setImageIndex] = React.useState<number>(0)
    return (
        <div className="w-full">
            <div className="h-[350px] flex flex-row  items-center justify-center mb-2">
                <img src={props.images[imageIndex].location_as_url} className="object-contain h-full" />
            </div>
            <div className="flex items-stretch items-center justify-around border-t py-2 mx-2 mt-2 border-slate-800" >
                {props.images.map((img, index) => 
                
                    <div 
                        onClick={() => {setImageIndex(index)}} 
                        className={
                                " w-20 border border-black rounded-md p-1 " + 
                                (index === imageIndex ? "border-[3px] " : "")
                            } 
                        >
                        <img src={img.location_as_url} className="object-contain h-full" />
                    </div>
                    
                )}
            </div>
        </div>
    )
}

const ProductDescription:React.FC<{product:IProduct}> = (props) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="text-2xl">
                {props.product.name}
            </p>
        </div>
    )
}

const InternalScreenImplementation:React.FC<{}> = () => {
    const product = useAppSelector(s => s.product)
    return (
        <div className=" w-full relative " style={{
        }}>
            <div className="pt-2 flex flex-col justify-around">

                <div className="flex justify-around" >
                    <div className="w-[50%] h-full border border-slate-400 ">
                        <Images images={product.product_images} />
                    </div>
                    <div className="w-[45%] h-full">
                        <ProductDescription product={product.products} />
                    </div>

                </div>
                <div className="h-[40%]">

                </div>
            </div>
        </div>
    )
}
const Products:React.FC<{}> = () => {

    return <div className="h-screen w-screen relative" >
        <Navbar />
        <TopBar />
        <div className="h-screen pl-12 pt-12">
            <InternalScreenImplementation />
        </div>
    </div>
}

export default Products