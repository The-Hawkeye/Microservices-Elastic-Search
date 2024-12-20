"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCart = exports.UpdateCart = exports.GetCart = exports.CreateCart = void 0;
const CreateCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "Cart created" };
});
exports.CreateCart = CreateCart;
const GetCart = () => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "Get Cart" };
});
exports.GetCart = GetCart;
const UpdateCart = () => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "Update cart" };
});
exports.UpdateCart = UpdateCart;
const DeleteCart = () => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "Delete cart" };
});
exports.DeleteCart = DeleteCart;
