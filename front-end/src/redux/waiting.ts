import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const waitingSlice = createSlice<
boolean,{
        setWaiting : () => boolean,
        setNotWaiting : () => boolean
    }
>({
  name: 'waiting',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setWaiting : () => {
            return true
        },
        setNotWaiting : () => {
            return false
        }
    },
})

export const { setWaiting, setNotWaiting } = waitingSlice.actions

export default waitingSlice.reducer