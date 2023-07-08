import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUsers,IUserAddresses } from '../types/database'

interface IUserContext{
    user: IUsers,
    token: string,
    user_addresses : IUserAddresses[],
    user_address_index:number
}
const initialState: IUserContext = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4ODIyMzcyN30.35bEFTp5RnVmFhe_y0gI2-5lZVXP0Wuqkb6a-r0FXUc",
    user:{
        id:11,
        email:"raghkum2000@gmail.com",
        first_name:"Raghav",
        last_name:"Kumar",
        user_type:2,
        coins:0
    },
    user_addresses:[{
        id : 2,
        user_id : 13,
        address_line_1 : "176",
        address_line_2 : "Industreial Town 4",
        address_line_3 : "Sector 5",
        zipcode : "121001",
        city : "Faridabad",
        country : "India"
    }],
    user_address_index:0
}

export const userContext = createSlice<
IUserContext,{
        setUserContext : (currentScreen:IUserContext, newScreen: PayloadAction<IUserContext>) => IUserContext
    }
>({
  name: 'screen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserContext : (_:IUserContext, newScreen: PayloadAction<IUserContext>) => {
            return newScreen.payload
        }
    },
})

export const { setUserContext } = userContext.actions
export type {IUserContext}
export default userContext.reducer