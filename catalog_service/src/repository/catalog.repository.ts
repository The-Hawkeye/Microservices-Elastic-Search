// Repository is a Data access layer

import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils";

export class CatalogRepository implements ICatalogRepository{

    _prisma: PrismaClient
    constructor(){
        this._prisma = new PrismaClient()
    }
    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({
            data,
        })
    }
    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: { id: data.id },
            data,
            })
    }
    async delete(id:number): Promise<{}> {
        return this._prisma.product.delete({
            where: { id },
        })
    }
    async getAll(limit:number , offset:number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset,
        })
    }
    async getOne(id: number): Promise<Product> {
        const product = await  this._prisma.product.findUnique({
            where: { id },
        })

        if(product){
            return Promise.resolve(product);
        }

        throw new NotFoundError("Product not found");
    }
}