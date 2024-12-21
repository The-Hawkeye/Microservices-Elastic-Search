import { Static, Type } from "@sinclair/typebox";

export const cartRequestSchema = Type.Object({
    customerId: Type.Integer(),
    productId: Type.Integer(),
    qty: Type.Integer()
})


export type CartRequestInput = Static<typeof cartRequestSchema>


export const cartEditRequestSchema = Type.Object({
    customerId: Type.Integer(),
    productId: Type.Integer(),
    qty: Type.Integer()
})


export type CartEditRequestInput = Static<typeof cartEditRequestSchema>