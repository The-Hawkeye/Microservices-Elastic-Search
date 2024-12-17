import { mock } from "node:test";
import { ICatalogRepository } from "../../interface/catalogRepository"
import { MockCatalogRepository } from "../../repository/mockCatalogRepository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker/.";
import { Product } from "../../models/product.model";
import { Factory } from "rosie";
import { ProductFactory } from "../../utils/fixtures";


// const productFactory = new Factory<Product>()
//     .attr("id", faker.number.int({min:1, max:1000}))
//     .attr("name", faker.commerce.productName())
//     .attr("price", +faker.commerce.price())
//     .attr("description", faker.commerce.productDescription())
//     .attr("stock", faker.number.int({min:10, max:100}))


const mockProduct = (rest:any)=>{
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max:100}),
        ...rest
    }
}
describe("catalogService Test", ()=>{

    let repository: ICatalogRepository ;
    beforeEach(()=>{
        repository = new MockCatalogRepository();
    })

    describe("createProduct", ()=>{

        test("should create a product", async()=>{
            const service  = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                description: expect.any(String),
                stock: expect.any(Number),
            })
        })

        test("should throw error with unable to create product", async()=>{
            const service  = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest.spyOn(repository, 'create').mockImplementationOnce(()=> Promise.resolve({} as Product))

            await expect(service.createProduct(reqBody)).rejects.toThrow("unable to create product");
        })


        test("should throw error with product already exists", async()=>{
            const service  = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest.spyOn(repository, 'create').mockImplementationOnce(()=> Promise.reject(new Error("product already exists")))

            await expect(service.createProduct(reqBody)).rejects.toThrow("product already exists");
        })
     })

     describe("update product", ()=>{

        test("should update product",async()=>{
            const service  = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int(),
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody)
        })


        test("should throw error with product does not exists", async()=>{
            const service  = new CatalogService(repository);

            jest.spyOn(repository, 'update').mockImplementationOnce(()=> Promise.reject(new Error("product does not exists")))

            await expect(service.updateProduct({})).rejects.toThrow("product does not exists");
        })
     })

     describe("getProducts", ()=>{

        test("should get products by offset and limit",async()=>{
            const service = new CatalogService(repository);

            const randomLimit = faker.number.int({min:10, max:50});

            const products = ProductFactory.buildList(randomLimit);

            jest.spyOn(repository, "getAll").mockImplementationOnce(()=> Promise.resolve(products))

            const result = await service.getProducts(randomLimit, 0);

            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);
        })

        test("should throw error with products does not exists", async()=>{
            const service  = new CatalogService(repository);

            jest.spyOn(repository, 'getAll').mockImplementationOnce(()=> Promise.reject(new Error("products does not exists")))

            await expect(service.getProducts(0,0)).rejects.toThrow("products does not exists");
        })
     })


     describe("getProduct", ()=>{

        test("should get product by id",async()=>{
            const service = new CatalogService(repository);

            const product = ProductFactory.build();

            jest.spyOn(repository, "getOne").mockImplementationOnce(()=> Promise.resolve(product))

            const result = await service.getProduct(product.id!)

            expect(result).toMatchObject(product);
        })
    })

    describe("deleteProduct", ()=>{

        test("should delete product by id",async()=>{
            const service = new CatalogService(repository);

            const product = ProductFactory.build();

            jest.spyOn(repository, "delete").mockImplementationOnce(()=> Promise.resolve({id:product.id}))

            const result = await service.deleteProduct(product.id!)

            expect(result).toMatchObject({id:product.id});
        })
    })


    afterEach(()=>{
        repository = {} as MockCatalogRepository;
    })
})