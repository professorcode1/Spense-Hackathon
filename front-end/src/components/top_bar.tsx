import * as React from "react"



const TopBar:React.FC<{}> = () => {
    const people_vector_art_index = React.useMemo(() => {
        return String(Math.floor(Math.random() * 4)) + String(Math.floor(Math.random() * 2))
    },[]) ;
    const [SearchInput, setSearchInput] = React.useState("")
    return (
        <div className="h-12 w-full top-0 left-0 absolute z-[100]" style={{
            backgroundColor:"#360094"
        }}>
            <div className="ml-16 flex items-center justify-between">
                <img src="spense logo with name.png" className="h-[44px] " />
                <div className="w-[40%] pt-1">
                    <input className="w-full h-[22px] rounded-md p-4" placeholder="Search" value={SearchInput} onChange={(e) => {
                        setSearchInput(e.target.value)
                    }} />
                </div>
                <div className="pr-4 rounded-lg" style={{
                    backgroundColor:"#360094"
                }}>
                   <img src={`people vector art/${people_vector_art_index}.jpg`} className="h-8 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default TopBar;