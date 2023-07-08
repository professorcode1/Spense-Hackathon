import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProductScreen } from '../types/API'
import productList from "./productlist.json"
const initialState: IProductScreen[] = productList

export const productListSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setProductList : (_:IProductScreen[], newScreen: PayloadAction<IProductScreen[]>) => {
            return newScreen.payload
        }
    },
})

export const { setProductList } = productListSlice.actions

export default productListSlice.reducer