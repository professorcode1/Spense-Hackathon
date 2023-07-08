import * as React from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import PleaseWait from "./please_wait";
import { appendToContext, popFromContext } from "../redux/category";
import { setWaiting, setNotWaiting } from "../redux/waiting";
import { setError } from "../redux/error";
import axios from "axios";
import { REQUEST_BASE_URL } from "../types/constants";
import { setProductList } from "../redux/productlist";
import { IProductScreen } from "../types/API";
import { setScreen } from "../redux/screen";
import { closeNavbar } from "../redux/navbar";
interface IListItem{
    value:string,
    onClick:() => void,
    img_source? : string
}

const ListItem:React.FC<IListItem> = (props:IListItem) => {
    return (
        <div className="border-b border-grey-800 cursor-pointer py-2 flex justify-between " onClick={props.onClick} >
            <div dangerouslySetInnerHTML={{ __html: props.value }} >
            </div>
            
            <img src={ props.img_source  ? props.img_source : "right arrow icon.png"} className="h-8 " />
        </div>
    )
}

const Category:React.FC<{}> = () => {
    const dispatcher = useAppDispatch()
    const category_data = useAppSelector(s => s.category)
    function category_to_list_mapper(catgeory_name:string){
        return {
            value : catgeory_name,
            onClick: () => {dispatcher(appendToContext(catgeory_name))}
        }
    }
    function download_product_data_and_set_state(catgeory_name:string){
        const onClick = async () => {
            dispatcher(setWaiting())
            try{
                console.log(catgeory_name)
                const category_id = category_data.data![category_data.currentContext[0]][category_data.currentContext[1]][catgeory_name]
                console.log({category_id})
                const result =  await axios.get<IProductScreen[]>(REQUEST_BASE_URL + "/get_products_by_category", {
                    params:{category_id}
                })
                dispatcher(setProductList(result.data))
                dispatcher(setScreen("ProductList"))
                dispatcher(closeNavbar())
            }catch(error:any){
                if(error?.response?.data?.message){
                    const error_message = error?.response?.data?.message
                    dispatcher(setError(error_message))
                }else{
                    const error_message = "Something went wrong while downloading product data"
                    dispatcher(setError(error_message))
                }
                console.log(error)
            }finally{
                dispatcher(setNotWaiting())
            }
        }
        return { onClick, value : catgeory_name}
    } 
    if (category_data.data === undefined){
        return <div className="px-2">
            <PleaseWait />
        </div>
    }

    let list;
    let header;
    let showBackOption = true;
    if(category_data.currentContext.length === 0){
        header = "Category"
        list = Object.keys(category_data.data!).map(category_to_list_mapper)
        showBackOption = false;
    }else if(category_data.currentContext.length === 1){
        header = category_data.currentContext[0]
        list = Object.keys(category_data.data![header]).map(category_to_list_mapper)
    // }else if(category_data.currentContext.length === 2){
    }else {
        header = category_data.currentContext[1]
        list = Object.keys(category_data.data[category_data.currentContext[0]][header]).map(download_product_data_and_set_state)
    }
    // const [navbarAnimationRef] = useAutoAnimate()

    return (
        <div className="mx-4" >
            <div className="font-semibold text-xl" dangerouslySetInnerHTML={{__html: header}}>
            </div>
            {showBackOption && 
                <ListItem value="Back" onClick={()=>{dispatcher(popFromContext())}} img_source="left arrow icon.png" />
            }
            <div>
                {list?.map((list_element) => 
                    <ListItem value={list_element.value} onClick={list_element.onClick} key={list_element.value} />
                )}
            </div>
        </div>
    )
}

export default Category