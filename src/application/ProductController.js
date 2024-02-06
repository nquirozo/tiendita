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
const ProductService_1 = require("../application/ProductService");
const product_list_container = document.getElementById("product-list");
const per_page_select = document.getElementById("per_page");
const entries = document.getElementById("entries");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");
const start_span = document.getElementById("start");
const end_span = document.getElementById("end");
let page = 1;
const load_products = () => __awaiter(void 0, void 0, void 0, function* () {
    product_list_container.innerHTML = "";
    const products_per_page = parseInt(per_page_select.value);
    console.log("ppp: " + products_per_page.toString());
    const product_list = yield (0, ProductService_1.get_all)();
    console.log("pagenumber (page var): " + page);
    let start = (page - 1) * products_per_page;
    let end = start + products_per_page;
    if (end >= product_list.length)
        end = product_list.length;
    init_paginator(product_list.length, products_per_page, start, end);
    console.log(`start: ${start} end: ${end}`);
    for (let i = start; i < end; i++) {
        let product = product_list[i];
        const template = `
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${encodeURI(product.images[0])}" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">

            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">$${product.price}</span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
        </div>
        </div>`;
        product_list_container.innerHTML += template;
    }
});
const prev = () => __awaiter(void 0, void 0, void 0, function* () {
    page = page - 1;
    yield load_products();
});
const next = () => __awaiter(void 0, void 0, void 0, function* () {
    page = page + 1;
    yield load_products();
});
const init_paginator = (arr_len, products_per_page, start, end) => {
    console.log("init paginator");
    console.log("page var : " + page);
    console.log("start: " + start.toString() + " end: " + end.toString());
    const last_page = Math.ceil(arr_len / products_per_page);
    start = start + 1;
    start_span.innerText = start.toString();
    end_span.innerText = end.toString();
    if (page > 1) {
        prev_btn.disabled = false;
        prev_btn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("click prev_btn");
            e.stopImmediatePropagation();
            yield prev();
        }));
    }
    else {
        prev_btn.disabled = true;
    }
    if (page < last_page) {
        next_btn.disabled = false;
        next_btn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("click next btn");
            e.stopImmediatePropagation();
            yield next();
        }));
    }
    else {
        next_btn.disabled = true;
    }
    entries.innerText = arr_len.toString();
};
const init_product_per_page = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("init ppp");
    per_page_select.addEventListener("change", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault;
        yield load_products();
        return;
    }));
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("init");
    init_product_per_page();
    load_products();
});
init();
