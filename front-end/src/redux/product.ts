import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProductScreen } from '../types/API'

const initialState: IProductScreen = {
    products:{
        id: 3141 ,
        name : "Logitech G335 Lightweight Gaming Wired Over Ear Headphones with Mic Flip to Mute 3.5Mm Audio Jack, Memory Foam Earpads, Compatible for Pc, Playstation, Xbox, Nintendo Switch (Black)",
        description:[
            " Lightweight Design: Weighing in at only 240 g (8.5 oz), G335 is smaller and lighter than the G733, features a suspension headband to help distribute weight and is adjustable for a customised fit. Frequency response: 20 Hz-20 KHz. Impedance: 36 Ohms Sensitivity: 87.5 dB SPL/mW  ",
            " All-day Comfort: Soft memory foam earphone pads and sports mesh material are comfortable for extended use so you can take your gaming to the next level in style and comfort  ",
            " Plug and Play: Quickly jump into your game and simply connect with the 3.5 mm audio jack; these colourful headphones are compatible with PC, laptop, gaming consoles, and select mobile devices  ",
            " Headset Controls: The volume roller is located directly on the ear cup to quickly turn up your game or music, whilst the flip-to-mute microphone can be easily moved out of the way  ",
            " Impressive Sound: With 40 mm neodymium drivers, the G335 PC gaming headset delivers crisp, clear stereo sound that makes your game come alive  ",
            " PC and Console Compatible: This gaming headset with microphone is compatible with PlayStation 5, PlayStation 4, Xbox One, Xbox Series X | S, and Nintendo Switch with 3.5 mm audio connection  ",
            " Vibrant Colours: G335 gaming headphones are available in multiple colourways, each with its own vibrant reversible, washable elastic headband and corresponding memory foam earpads  "
            ],
        category_id:17,
        brand_id:76,
        price:6495,
        margin:167,
        vendor_id:2,
        metadata:{"Brand":"Logitech G","Model Name":"G335","Colour":"Black","Form Factor":"Over Ear","Connectivity Technology":"Wired"}
    },
    product_images:[
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/71HnljSsJ3S._SX679_.jpg"},
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/71Iu-tnU62S._SX679_.jpg"},
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/71POwKi-IVS._SX679_.jpg"},
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/71QEWj+ioXS._SX679_.jpg"},
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/81mZG+G6AUS._SX679_.jpg"},
        {"product_id":3141,"location_as_url":"https://m.media-amazon.com/images/I/91gca4W4R7S._SX679_.jpg"}
    ]
}

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
        setProduct : (_:IProductScreen, newScreen: PayloadAction<IProductScreen>) => {
            return newScreen.payload
        }
    },
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer