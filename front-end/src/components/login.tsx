import * as React from "react"
import axios from 'axios';
import { REQUEST_BASE_URL } from "../types/constants";
import { IUserContext } from "../redux/user_context";
import { useAppDispatch } from "../redux/hooks";
import { setUserContext } from "../redux/user_context";
import { setScreen } from "../redux/screen";
import { setWaiting, setNotWaiting } from "../redux/waiting";
import { setError } from "../redux/error";
const Login:React.FC<{mountRegisterForm:() => void}> = (props:{mountRegisterForm:() => void}) => {
    const dispatcher = useAppDispatch()
    async function LoginFormSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        // @ts-expect-error
        const email = event.target.elements.email.value;
        // @ts-expect-error
        const password = event.target.elements.password.value;
        const form_data = {email, password};
        try{
            dispatcher(setWaiting())
            const register_result = await axios.post<IUserContext>(REQUEST_BASE_URL + "/login", form_data);
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
    return <div className="flex flex-col transition" >
        <form onSubmit={LoginFormSubmit}  className="w-full px-8">
            <div className="flex flex-col justify-around">
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="email" name="email"  placeholder="Email" />
                <input className="m-1 mt-2 border-grey-800 border rounded-lg px-2 py-1" type="password" name="password" placeholder="Password" />
                <div className="flex mt-2 justify-evenly ">
                    <button className="mx-4 py-1 border-grey-800 border rounded-full px-8 text-white text-sm" style={{
                        backgroundColor:"#ff735c"
                    }} >Login</button>
                    <button className="mx-4 py-1 border-grey-800 border rounded-full px-8 text-slate-600 text-sm" style={{

                    }} onClick={(e) => {
                        e.preventDefault()
                        props.mountRegisterForm();
                    }} >Register</button>
                </div>
            </div>
        </form>
    </div>
}

export default Login