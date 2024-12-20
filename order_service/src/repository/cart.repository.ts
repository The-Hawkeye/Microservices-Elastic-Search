import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.types";


const createCart = async(input:any): Promise<{}> =>{
    //connect to DB and perform DB operatio

    const result = await DB.insert(carts).values({
        customerId:input
    }).returning({cartId: carts.id})

    console.log(result)
    return Promise.resolve({});
}

const findCart = async(input:any): Promise<{}> =>{
    return Promise.resolve({});
}

const updateCart = async(input:any): Promise<{}> =>{
    return Promise.resolve({});
}

const deleteCart = async(input:any): Promise<{}> =>{
    return Promise.resolve({});
}

export const CartRepository : CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart
}
