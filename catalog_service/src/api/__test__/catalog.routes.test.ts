import request  from "supertest";
import express from "express";
import { faker, Faker } from "@faker-js/faker/.";
import catalogRoutes , {catalogService} from "../catalog.routes"
import { ProductFactory } from "../../utils/fixtures";


const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = ()=>{
    return {
        name:faker.commerce.productName(),
        price:+faker.commerce.price(),
        description:faker.commerce.productDescription(),
        stock:faker.number.int({min:10, max:100}),
    }
}



describe("catalogRoutes", ()=>{

    describe("POST /products", ()=>{
        test("should create a product successfully", async()=>{
            const reqBody = mockRequest();

            const product = ProductFactory.build()

            jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(()=>
                Promise.resolve(product)
            )
            const response = await request(app)
            .post("/product")
            .send(reqBody)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        })

        test("should respond with validation error 400", async()=>{
            const reqBody = mockRequest();

            const product = ProductFactory.build()

            const response = await request(app)
            .post("/product")
            .send({...reqBody, name:""})
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty");
        })


        test("should response with an internal error code 500", async()=>{
            const reqBody = mockRequest();

            jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(()=>
                Promise.reject(new Error("error occurred on create product"))
            )
            const response = await request(app)
            .post("/product")
            .send(reqBody)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occurred on create product");
        })
    })



    describe("POST /products/:id", ()=>{
        test("should update a product successfully", async()=>{
            // const reqBody = mockRequest();

            const product = ProductFactory.build()
            const reqBody = {
                name:product.name,
                price:product.price,
                stock:product.stock
            }

            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(()=>
                Promise.resolve(product)
            )
            const response = await request(app)
            .patch(`/product/${product.id}`)
            .send(reqBody)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })

        test("should respond with validation error 400", async()=>{
            const product = ProductFactory.build()
            const reqBody = {
                name:product.name,
                price:-1,
                stock:product.stock
            }
       //-ve price to check test case
            const response = await request(app)
            .patch(`/product/${product.id}`)
            .send({...reqBody})
            .set('Accept', 'application/json');

     

            console.log('Test Response', response);
            expect(response.status).toBe(400);
            expect(response.body).toEqual("price must not be less than 1");
        })


        test("should response with an internal error code 500", async()=>{
            const reqBody = mockRequest();
            const product = ProductFactory.build();

            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(()=>
                Promise.reject(new Error("unable to update product"))
            )
            const response = await request(app)
            .patch(`/product/${product.id}`)
            .send(reqBody)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to update product");
        })
    })



    describe("GET /products", ()=>{
        test("should return a range of products based on limit and offset", async()=>{

            const randomLimit = faker.number.int({min:10, max:50});


            const products = ProductFactory.buildList(randomLimit);
    

            jest.spyOn(catalogService, 'getProducts').mockImplementationOnce(()=>
                Promise.resolve(products)
            )
            const response = await request(app)
            .get(`/products?limit=${randomLimit}&offset=0`)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        })
    })


    describe("GET /product/:id", ()=>{
        test("should return a single product by id", async()=>{

            const product = ProductFactory.build();
    

            jest.spyOn(catalogService, 'getProduct').mockImplementationOnce(()=>
                Promise.resolve(product)
            )
            const response = await request(app)
            .get(`/product/${product.id}`)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })
    })


    describe("DELETE /product/:id", ()=>{
        test("should delete a single product by id", async()=>{

            const product = ProductFactory.build();
    

            jest.spyOn(catalogService, 'deleteProduct').mockImplementationOnce(()=>
                Promise.resolve({id:product.id})
            )
            const response = await request(app)
            .delete(`/product/${product.id}`)
            .set('Accept', 'application/json');


            console.log('Test Response', response);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({id:product.id});
        })
    })
})