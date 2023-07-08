import type { IProduct, IProductImages } from './database'

interface IProductScreen{
    products : IProduct, 
    product_images : IProductImages[]
}

export type {IProductScreen}