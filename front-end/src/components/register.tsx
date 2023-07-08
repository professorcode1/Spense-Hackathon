import * as React from "react"
import axios from 'axios';
import { REQUEST_BASE_URL } from "../types/constants";
import { IUserContext } from "../redux/user_context";
import { useAppDispatch } from "../redux/hooks";
import { setUserContext } from "../redux/user_context";
import { setScreen } from "../redux/screen";
import { setWaiting, setNotWaiting } from "../redux/waiting";
import { setError } from "../redux/error";

const Register:React.FC<{mountLoginForm:() => void}> = (props:{mountLoginForm:() => void}) => {
    const dispatcher = useAppDispatch()
    async function RegisterFormSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        // @ts-expect-error
        const email = event.target.elements.email.value;
        // @ts-expect-error
        const first_name = event.target.elements.first_name.value;
        // @ts-expect-error
        const last_name = event.target.elements.last_name.value;
        // @ts-expect-error
        const password = event.target.elements.password.value;

        // @ts-expect-error
        const address_line_1 = event.target.elements.address_line_1.value; 
        // @ts-expect-error
        const address_line_2 = event.target.elements.address_line_2.value; 
        // @ts-expect-error
        const address_line_3 = event.target.elements.address_line_3.value; 
        // @ts-expect-error
        const zipcode = event.target.elements.zipcode.value; 
        // @ts-expect-error
        const city = event.target.elements.city.value; 
        // @ts-expect-error
        const country = event.target.elements.country.value; 
        const form_data = {email, first_name, last_name , password, address_line_1,
            address_line_2,
            address_line_3,
            zipcode,
            city,
            country};
        try{
            dispatcher(setWaiting())
            const register_result = await axios.post<IUserContext>(REQUEST_BASE_URL + "/register", form_data);
            dispatcher(setUserContext(register_result.data))
            dispatcher(setScreen("Homescreen"))

        }catch(error:any){
            if(error?.response?.data?.message){
                const error_message = error?.response?.data?.message
                dispatcher(setError(error_message))
                console.log(error_message)
            }else{
                const error_message = "Something went wrong"
                dispatcher(setError(error_message))
                console.log(error)
            }
        }finally{
            dispatcher(setNotWaiting())
        }
    }
    // const 
    return (
    <div className="flex flex-col" >
        <form onSubmit={RegisterFormSubmit}  className="w-full px-8">
            <div className="flex flex-col justify-around">
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="first_name" placeholder="First Name" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="last_name" placeholder="Last Name" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="address_line_1" placeholder="address Line 1" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="address_line_2" placeholder="address Line 2" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="address_line_3" placeholder="address Line 3" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="zipcode" placeholder="Zipcode" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="city" placeholder="City" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="text" name="country" placeholder="Country" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="email" name="email" placeholder="Email" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="password" name="password" placeholder="Password" />
                <div className="flex mt-2 justify-evenly ">
                    <button className="mx-4 py-1 border-grey-800 border rounded-full px-8 text-slate-600 text-sm" style={{
                    }} onClick={(e) => {
                        e.preventDefault()
                        props.mountLoginForm();
                    }}>Login</button>
                    <button className="mx-4 py-1 border-grey-800 border rounded-full px-8 text-white text-sm" style={{
                        backgroundColor:"#ff735c"
                    }} >Register</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default Register