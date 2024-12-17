import { off } from "process";
import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogService{

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository){
        this._repository = repository;
    }

    async createProduct(input: any){
        const data = await this._repository.create(input);
        if(!data.id){
            throw new Error('unable to create product');
        }
        return data;
    }

    async updateProduct(input:any){
        const data = await this._repository.update(input);

        if(!data.id){
            throw new Error('unable to update product');
        }

        // emit event to update data in elastic sesarch
        return data;

    }

    // Instead of this we will get products from elastic search
    async getProducts(limit: number, offset:number){
        const products  = await this._repository.getAll(limit, offset);
        return products;
    }

    // Actual product will be fetched from elastic search
    async getProduct(id:number){
        const product = await this._repository.getOne(id);
        return product;
    }

    async deleteProduct(id:number){
        const data = await this._repository.delete(id);

        //delete product from Elastic search also
        return data;
    }
}