const SCREEN_NAMES = [
    "LandingPage",
    "Homescreen",
    "Product",
    "ProductList"
] as const;

export type IScreen = typeof SCREEN_NAMES[number]

