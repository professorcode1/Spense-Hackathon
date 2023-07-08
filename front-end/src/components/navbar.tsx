import * as React from "react";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Category from "./category";
import { openNavbar, closeNavbar } from "../redux/navbar";
const Header:React.FC<{close:() => void}> = (props:{close:() => void}) => {
    return <div className="flex h-[60px]  flex justify-between items-center px-4">
        <div className="flex items-center">
            <img src="spense logo.jpg" className="h-10 " />
            <div className="text-xl  pt-3">Spense</div>
        </div>
        <img src="x icon.png" className="h-6  mt-2 cursor-pointer" onClick={props.close} />
    </div>
}
const Location:React.FC<{address_line_1:string,zipcode:string}> = (props:{address_line_1:string,zipcode:string}) => {
    return <div className="flex items-center py-1 bg-gray-300 px-4">
        <img src="location icon.png" className="h-4 w-4 mr-1" /> 
        <p className="text-sm">
            {props.address_line_1}, 
            {props.zipcode}
        </p>
    </div>

}
const SearchBox:React.FC<{}> = () => {
    return (
        <div className="my-2 relative mx-4">
            <input placeholder="Search" className="w-full border border-black rounded-md pl-2 py-2 pr-2"/>
            <img src="search icon.png" className=" absolute h-6 cursor-pointer" style={{
                top:8,
                right:4
            }} />
        </div>
    )
}  
const QuickActions:React.FC<{}> = () => {
    return (
        <div className="mx-4">
            <p className="font-semibold text-lg">
                Qucik Actions
            </p>
            <div className="flex justify-around">
                <div className="bg-gray-300 p-1 grow w-24 flex flex-col items-center justify-center m-2 cursor-pointer">
                    <img src="blue delivery box icon.png" className="h-8" /> 
                    <p>Orders</p>
                </div>

                <div className="bg-gray-300 p-1 grow w-24 flex flex-col items-center justify-center m-2 cursor-pointer">
                    <img src="blue cart icon.png" className="h-8" /> 
                    <p>Cart</p>
                </div>
            </div>
        </div>
    )
}
const Footer:React.FC<{width:number, height:number}> = (props) => {
    return (
        <div  className="fixed bottom-0 w-full flex justify-around bg-white border-r border-slate-800 rounded-md" style={{
            width:props.width,
            height:props.height
        }} >
            <div className="flex flex-col bg-slate-600 grow mx-2 items-center justify-center">
                <img src="home icon.png" className="h-8 w-8" />
            </div>
            <div className="flex flex-col grow mx-2 items-center justify-center" >
                <img src="user icon.png" className="h-8 w-8 " />
            </div>
        </div>
    )
}
const Navbar:React.FC<{}> = () => {
    // const [open, setOpen] = React.useState<boolean>(false)
    const {open} = useAppSelector(s => s.navbar)
    const dispacher = useAppDispatch()
    const user_context = useAppSelector(s => s.user_context)
    const onHomeScreen = useAppSelector(s => s.screen) === "Homescreen"
    const width = 400
    const footerHeight = 40;
    if(open){
        return (
            <div className="h-screen border border-black flex flex-col justify-start absolute bg-white z-[1000]" 
                style={{
                    width
                }}>
                <div className="relative overflow-auto h-screen ">
                    <div style={{
                        paddingBottom:footerHeight
                    }}>
                        <Header close={() => dispacher(closeNavbar())} />
                        <Location 
                            address_line_1 = {user_context.user_addresses[user_context.user_address_index].address_line_1}
                            zipcode = {user_context.user_addresses[user_context.user_address_index].zipcode}
                            />
                        <SearchBox />
                        <QuickActions />
                        <Category />
                    </div>
                    <Footer width={width} height={footerHeight} />
                </div>
            </div>            
        )
    }
    return (
        <div className="h-screen w-12 border border-black flex justify-center absolute bg-white z-[1000]">
            <div onClick={() => {dispacher(openNavbar())}}>
                <img src="menu minimalist icon.png" className="w-6  mt-4" />
            </div>
        </div>
    )
}

export default Navbar