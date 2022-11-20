import { products } from "../typings";


export const FetchProducts = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getProducts`) 

    const data = await res.json();

    const products : products[] = data.product

    return products;

}