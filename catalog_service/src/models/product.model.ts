export class Product {
    constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly description: string,
        public readonly stock: number,
        // public readonly image: string,
        // public readonly category: string,
        // public readonly brand: string,
        // public readonly rating: number,
        // public readonly reviews: number,
        // public readonly isBestSeller: boolean,
        // public readonly isFreeShipping: boolean,
        // public readonly isDiscounted: boolean,
        // public readonly discountPercentage: number,
        // public readonly discountPrice: number,
        public readonly id?: number,
        ) {}
    }