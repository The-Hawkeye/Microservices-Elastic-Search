import { mock } from "node:test";
import { CartRepository } from "../repository/cart.repository";
import { CartRepositoryType } from "../types/repository.types";
import { CreateCart } from "./cart.service";

describe("cartService", ()=>{
    let repo:CartRepositoryType;

    beforeEach(()=>{
        repo = CartRepository;
    });

    afterEach(()=>{
        repo = {} as CartRepositoryType;
    })


    it("should return correct data while creating cart", async()=>{
        const mockCart = {
            title:"smart phone",
            amount:1000,
        }

        jest.spyOn(CartRepository, "create").mockImplementationOnce(()=> Promise.resolve({
            message:"exact response",
            input: mockCart
        }))
        
        const cart = await CreateCart(mockCart, repo);
        expect(cart).toEqual({
            message:"exact response",
            input: mockCart
        })
    })
})