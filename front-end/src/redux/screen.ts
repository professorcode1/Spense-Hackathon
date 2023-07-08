import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'
import type { IScreen } from '../types/screens'


// Define the initial state using that type
const initialState: IScreen = "LandingPage"

export const screenSlice = createSlice<
IScreen,{
        setScreen : (currentScreen:IScreen, newScreen: PayloadAction<IScreen>) => IScreen
    }
>({
  name: 'screen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setScreen : (_:IScreen, newScreen: PayloadAction<IScreen>) => {
            return newScreen.payload
        }
    },
})

export const { setScreen } = screenSlice.actions

export default screenSlice.reducer