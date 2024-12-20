"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
// import catalogRouter from "./api/catalog.routes"
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(order_routes_1.default);
app.use(cart_routes_1.default);
app.use("/", (req, res, _) => {
    res.status(200).json({ message: "Server is up" });
});
exports.default = app;
