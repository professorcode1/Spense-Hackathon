import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../types/database'
// @ts-expect-error
import groupArray from "group-array"
interface ICategoryState{
    data?:{
        [category:string]:{
            [subcategory:string]:{
                [subsubcategory:string] : number
            }
        }
    },
    currentContext:string[]
}

const initialState: ICategoryState = {currentContext:[]}

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setCategoryData : (_:ICategoryState, categoryData: PayloadAction<ICategory[]>) => {
            const data:any= groupArray(categoryData.payload, "category", "subcategory","subsubcategory" )
            for(const category of Object.values(data)){
                for(const subcategory of Object.values(category as any)){
                    for(const subsubcategory of Object.keys(subcategory as any)){
                        (subcategory as any)[subsubcategory] = ((subcategory as any)[subsubcategory] as ICategory[])[0].id
                    }
                }
            }
        
            return {data, currentContext:[]} as ICategoryState
        },
        appendToContext : (currentCategoryState:ICategoryState, newContext:PayloadAction<string>) => {
            currentCategoryState.currentContext.push(newContext.payload)
            return currentCategoryState
        },
        popFromContext : (currentCategoryState:ICategoryState) => {
            currentCategoryState.currentContext.pop()
            return currentCategoryState
        }
    },
})

export const { setCategoryData, appendToContext,popFromContext } = categorySlice.actions

export default categorySlice.reducer


// <
// string,{
//         setError : (currentScreen:string, newScreen: PayloadAction<string>) => string
//     }
// >