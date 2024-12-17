"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price, description, image, stock, category, brand, rating, reviews, isBestSeller, isFreeShipping, isDiscounted, discountPercentage, discountPrice, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.category = category;
        this.brand = brand;
        this.rating = rating;
        this.reviews = reviews;
        this.isBestSeller = isBestSeller;
        this.isFreeShipping = isFreeShipping;
        this.isDiscounted = isDiscounted;
        this.discountPercentage = discountPercentage;
        this.discountPrice = discountPrice;
        this.id = id;
    }
}
exports.Product = Product;
