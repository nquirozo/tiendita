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
exports.get_product = exports.get_all = void 0;
console.log("hola");
const init_get = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};
const get_product = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.escuelajs.co/api/v1/products/${product_id}`, init_get);
    const product = yield response.json();
    console.log(product);
});
exports.get_product = get_product;
const get_all = () => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    const response = yield fetch(`https://api.escuelajs.co/api/v1/products`, init_get);
    yield response.json().then((json) => {
        products = json;
    });
    return products;
});
exports.get_all = get_all;
