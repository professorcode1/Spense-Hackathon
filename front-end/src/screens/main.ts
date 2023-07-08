import { IScreen } from "../types/screens";
import * as React from "react"
import LandingPage from "./LandingPage";
import Homescreen from "./Homescreen"
import ProductScreen from "./Products"
import ProductsListScreen from "./ProductList";
const ScreenNameToComponentMapping =  new Map<IScreen, React.FC>([
    ["LandingPage", LandingPage],
    ["Homescreen", Homescreen],
    ["Product", ProductScreen],
    ["ProductList", ProductsListScreen]
])

export default ScreenNameToComponentMapping;