// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import { urlFor } from '../../sanity';
import { products } from '../../typings'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2022-08-01",
  });


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === "POST") {
    const items: products[] = req.body.items;
    

    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [urlFor(item.image).url()],
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }));

      try {
        const parms : Stripe.Checkout.SessionCreateParams = {
            payment_method_types : ["card"],
            line_items: transformedItems,
            payment_intent_data : {},
            mode: "payment",
            success_url: `${req.headers.origin}/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/checkout`,
            metadata : {
                images: JSON.stringify(items.map((item) => item.image.asset._ref)),
            },
        }

        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(parms);

    res.status(200).json( checkoutSession )
  } catch (err) {
    const errorMessage = 
    err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({statusCode : 500, message : errorMessage})
  }  
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}


