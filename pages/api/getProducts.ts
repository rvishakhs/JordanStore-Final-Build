import type { NextApiRequest, NextApiResponse } from 'next'
import {groq}  from "next-sanity";
import {sanityClient} from "../../sanity"
import { products } from '../../typings';


const query = groq `
    *[_type == "product"] 
`;


type Data = {
  product: products[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const product : products[]  = await sanityClient.fetch(query) 
  res.status(200).json({ product })
}

