import { categories } from "../typings";


export const FetchCategories = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getCategories`) 

    const data = await res.json();

    const categories : categories[] = data.category

    return categories
    
}