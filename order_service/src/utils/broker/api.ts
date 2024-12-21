import axios from 'axios'
import { APIError } from '../error';
import { logger } from '../logger';
import { Product } from '../../dto/product.dto';

export const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:8000"// should be in env


export const GetProductDetaile = async(productId:number) =>{

    try{
        const data = await axios.get(`${CATALOG_BASE_URL}/product/${productId}`)
        const product = data.data;
        return product as Product;
    }catch(err: any){
        logger.error(err);
        throw new APIError("Product not found")
    }
}