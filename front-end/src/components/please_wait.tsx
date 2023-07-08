import * as React from "react";
const PleaseWait:React.FC<{}> = () => {
    const [dots, setDots] = React.useState(0)
    React.useEffect(() => {
        const interval_id = setInterval(() => {
            setDots((dots + 1) % 3 )
        }, 1000)
        return () => {clearInterval(interval_id)}
    }, [])
    return (
        <div className="text-lg font-semibold p-2">
            Please wait{'.'.repeat(dots + 1)}
        </div>
    )

}

export default PleaseWait