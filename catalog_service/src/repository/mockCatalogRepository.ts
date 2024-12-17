import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        const mockProduct =  {
            id: 1,
            ...data
        } as Product


        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }
    delete(id: number): Promise<{}> {
        return Promise.resolve(id);
    }
    getAll(limit:number , offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    getOne(id: number): Promise<Product> {
        return Promise.resolve({id} as unknown as Product);
    }

}