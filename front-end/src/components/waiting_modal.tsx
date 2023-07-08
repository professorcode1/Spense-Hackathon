import * as React from "react"
import { useAppSelector } from '../redux/hooks'

const WaitingModal:React.FC<{}> = () => {
    const waiting = useAppSelector(state => state.waiting)
    React.useEffect(() => {
        if(waiting){
            dialogRef.current?.showModal()
        }else{
            dialogRef.current?.close()
        }
    }, [waiting])
    const dialogRef = React.useRef<HTMLDialogElement>(null)
    return (
        <dialog ref={dialogRef}>
            <div className="m-8 p-4 text-xl font-bold">
                Please Wait
            </div>
        </dialog>
    )
}

export default WaitingModal