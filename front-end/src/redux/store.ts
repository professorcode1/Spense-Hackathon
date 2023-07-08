import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screen"
import userContextReducer from "./user_context";
import waitingReducer from "./waiting";
import errorReducer from "./error"
import categoryReducer from "./category";
import productReducer from "./product"
import productListReducer from "./productlist"
import navbarReducer from "./navbar"
export const store =  configureStore({
    reducer:{
        screen : screenReducer,
        user_context:userContextReducer,
        waiting :waitingReducer,
        error:errorReducer,
        category:categoryReducer,
        product: productReducer,
        productList:productListReducer,
        navbar:navbarReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


