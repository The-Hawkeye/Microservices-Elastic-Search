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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const express_app_1 = __importDefault(require("./express-app"));
const PORT = process.env.PORT || 8000;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    express_app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(err);
        process.exit(1);
    }));
});
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => {
    console.log("Server is running");
}).catch((err) => {
    console.log(err, "Failed to start server");
});