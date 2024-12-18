// Repository is a Data access layer

import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id:number): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    getAll(limit:number , offset:number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}