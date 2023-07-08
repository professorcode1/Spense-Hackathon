import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../types/database'

interface INavbar {open:boolean};

const initialState:INavbar  = {open:false}

export const navbarSlice = createSlice({
  name: 'navbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        openNavbar : (_:INavbar) => {
            return {open:true}
        },
        closeNavbar : (_:INavbar) => {
            return {open:false}
        }
    },
})

export const { openNavbar, closeNavbar } = navbarSlice.actions

export default navbarSlice.reducer


// <
// string,{
//         setError : (currentScreen:string, newScreen: PayloadAction<string>) => string
//     }
// >