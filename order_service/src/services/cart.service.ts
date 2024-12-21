import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto";
// import { CartRepositoryType } from "../types/repository.types"
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetProductDetaile } from "../utils/broker";

export const CreateCart = async(input:CartRequestInput, repo: CartRepositoryType)=>{
    //Make a call to catalog microservice to get product info
    //it will be a synchronous call

    const productDetail = await GetProductDetaile(input.productId);
    logger.info(productDetail)

    if(productDetail.stock < input.qty){
        throw new NotFoundError("Product is out of stock");
    }
    const data  = await repo.createCart(input.customerId, {
        productId:productDetail.id,
        price:productDetail.price.toString(),
        qty:input.qty,
        itemName: productDetail.name,
        variant:productDetail.variant
    } as CartLineItem);
    return data;
}

export const GetCart = async(id: number,  repo: CartRepositoryType)=>{
    const data = await repo.findCart(id);

    if(!data){
        throw new NotFoundError("Cart not found");
    }
    return data;
}


export const UpdateCart = async(input: CartEditRequestInput,  repo: CartRepositoryType)=>{
    const data = await repo.updateCart(input.productId, input.qty);
    return data;
}

export const DeleteCart = async(id:number,  repo: CartRepositoryType)=>{
    const data = await repo.deleteCart(id);
    return data;
} 