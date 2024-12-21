import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsString()
    description: string;

    @IsNumber()
    stock:number
}



export class UpdateProductRequest {

    name?:string;

    price?: number;

    description?: string;

    @IsNumber()
    stock?:number
}