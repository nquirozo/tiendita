import { Product } from '../domain/entities/Product';
console.log("hola");
const init_get = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    } 
};
const get_product = async (product_id:number) =>{
    
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${product_id}`, init_get);
    const product: Product = await response.json();
    console.log(product);
}

const get_all = async () =>{

    let products:Product[] = []; 
    const response = await fetch(`https://api.escuelajs.co/api/v1/products`, init_get);
    await response.json().then((json:Product[])=>{
        products = json;
    });
    return products;
}

export { get_all, get_product };
