import { Product } from "../models/product.model"

export interface ICatalogRepository {
    create(data:Product): Promise<Product>
    update(data: Product): Promise<Product>
    delete(id: number): Promise<{}>
    getAll(limit:number, offset:number): Promise<Product[]>
    getOne(id: number): Promise<Product>
}