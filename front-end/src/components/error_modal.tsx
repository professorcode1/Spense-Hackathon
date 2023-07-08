import * as React from "react"
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setError } from "../redux/error"

const ErrorModal:React.FC<{}> = () => {
    const dispatcher = useAppDispatch()
    const error:string = useAppSelector(state => state.error)
    React.useEffect(() => {
        if(error){
            dialogRef.current?.showModal()
        }else{
            dialogRef.current?.close()
        }
    }, [error])
    const dialogRef = React.useRef<HTMLDialogElement>(null)
    return (
        <dialog ref={dialogRef}>
            <div className="m-8 p-4">
                <div className="text-3xl m-2" >
                    Opps
                </div>
                <div className="m-2">
                    {error}
                </div>
                <button className="m-2 py-1 border-grey-800 border rounded-full px-8 text-slate-600 text-sm" style={{
                }} onClick={() =>{dispatcher(setError(""))} }>Close</button>
            </div>
        </dialog>
    )
}

export default ErrorModal