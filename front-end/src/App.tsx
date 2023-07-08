import { useAppSelector,  useAppDispatch } from './redux/hooks'
import ScreenNameToComponentMapping from './screens/main'
import "./output.css"
import WaitingModal from './components/waiting_modal'
import ErrorModal from './components/error_modal'
import { setCategoryData } from "./redux/category"
import axios from "axios"
import { ICategory } from "./types/database"
import { REQUEST_BASE_URL } from "./types/constants"
import { setError } from './redux/error'
import * as React from "react"
function App() {
  const dispatcher = useAppDispatch()
  const current_screen_name = useAppSelector((state) => state.screen)
  const Screen = ScreenNameToComponentMapping.get(current_screen_name)!
  React.useEffect(() => {
    (async ()=>{
      try{
        const category_data = await axios.get<ICategory[]>(REQUEST_BASE_URL + "/category")
        console.log(category_data)
        dispatcher(setCategoryData(category_data.data))
      }catch(error){
        dispatcher(setError("Failed to download category data. Reload page or try again later"))
      }
    })()
}, []);
  return (
    <>
      <Screen />
      <WaitingModal />
      <ErrorModal />
    </>
  )
}

export default App
