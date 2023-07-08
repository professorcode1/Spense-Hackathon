import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ""

export const errorSlice = createSlice<
string,{
        setError : (currentScreen:string, newScreen: PayloadAction<string>) => string
    }
>({
  name: 'screen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setError : (_:string, newScreen: PayloadAction<string>) => {
            return newScreen.payload
        }
    },
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer