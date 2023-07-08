import * as React from "react"
import Login from "../components/login"
import Register from "../components/register"
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Form:React.FC<{}> = () => {
    const people_vector_art_index = String(Math.floor(Math.random() * 4)) + String(Math.floor(Math.random() * 2))
    const [showLoginForm, setShowLoginForm] = React.useState<boolean>(true)
    const [formContainerAnimationRef] = useAutoAnimate()
    return (
        <div className="h-[70%]  m-8 ml-4 flex flex-col justify-between " ref={formContainerAnimationRef}>
            <div className="flex justify-center pb-8 h-[70%]">
                <div className="flex flex-col items-center">
                    <img src={`people vector art/${people_vector_art_index}.jpg`} style={{
                        height:100,
                        width:100
                    }} />
                    {showLoginForm ?  <p>Hi! Welcome back😊</p> : <p>Sign up!</p>}
                </div>
            </div>
            {showLoginForm ? <Login mountRegisterForm={() => {setShowLoginForm(false)}} /> : <Register mountLoginForm={() => {setShowLoginForm(true)}} />}
        </div>
    )
}

const LandingPage:React.FC<{}> = () => {
    
return <div className="w-screen h-screen flex flex-row items-around overflow-clip">
        <div className="h-sceen w-[30%] flex flex-col justify-center border-r-2 border-grey-800 my-8 overflow-y-auto">
            {/* <div className="flex items-center ml-4">
                <img src="spense logo.jpg" style={{
                    height:40,
                    width:40
                }} className="mr-0" />
                <p className="text-2xl">Spense</p>
            </div> */}
            <Form />
        </div>
        <img src="ecommerce vector art.jpeg" style={{
            objectFit:"contain"
        }} className="w-[70%]" />
    </div>
}

export default LandingPage