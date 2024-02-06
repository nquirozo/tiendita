import { Product } from '../domain/entities/Product';
import { get_all } from '../application/ProductService';


const product_list_container:HTMLElement|null = document.getElementById("product-list")!;
const per_page_select: HTMLSelectElement = document.getElementById("per_page")! as HTMLSelectElement;
const entries:HTMLElement = document.getElementById("entries")!;
const prev_btn:HTMLButtonElement = document.getElementById("prev")! as HTMLButtonElement;
const next_btn:HTMLButtonElement = document.getElementById("next")! as HTMLButtonElement;
const start_span:HTMLElement = document.getElementById("start")!;
const end_span:HTMLElement = document.getElementById("end")!;
let page = 1;
const load_products = async () => {
    
    product_list_container.innerHTML = "";
    

    const products_per_page:number = parseInt(per_page_select.value);
    console.log("ppp: "+products_per_page.toString());

    const product_list = await get_all();
    console.log("pagenumber (page var): "+ page);
    let start = (page-1) * products_per_page;
    
    let end = start + products_per_page;
    
    if(end >= product_list.length)
        end = product_list.length;

    init_paginator(product_list.length, products_per_page, start, end);
    console.log(`start: ${start} end: ${end}`);
    for(let i = start; i < end; i++){
        let product:Product = product_list[i];
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
        product_list_container!.innerHTML += template;
    }


}

const prev = async () =>{
    page = page - 1;
    await load_products();
}
const next = async () => {
    page = page + 1;
    await load_products();
}

const init_paginator = (arr_len:number, products_per_page:number, start:number, end:number) => {
    console.log("init paginator")
    console.log("page var : "+ page)
    console.log("start: "+ start.toString()+ " end: "+end.toString())
    const last_page = Math.ceil(arr_len /products_per_page);
    start = start +1;
    start_span.innerText = start.toString();
    end_span.innerText = end.toString();
    if(page > 1){
        prev_btn.disabled = false
        prev_btn.addEventListener("click", async (e) =>{
            console.log("click prev_btn")
            e.stopImmediatePropagation();
            await prev();
        });
    }else{
        prev_btn.disabled = true;
    }
    
    if(page < last_page){
        next_btn.disabled = false;
        next_btn.addEventListener("click", async (e) => {
            console.log("click next btn")
            e.stopImmediatePropagation();
            await next()
        });
    }else{
        next_btn.disabled = true;
    }
    
    entries!.innerText = arr_len.toString();

}
const init_product_per_page = async () => {
    console.log("init ppp");

    per_page_select.addEventListener("change", async (e)=>{
        e.preventDefault;
        await load_products();
        return;
    });

}

const init = async () => {
    console.log("init");
    init_product_per_page();
    load_products();
}

init();
