import { Stripe } from 'stripe'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import CheckoutPage from '../components/CheckoutPage'
import Header from '../components/Header'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import { products } from '../typings'
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from '../utils/get-stripejs'


type Props = {}

function cartdetails({}: Props) {

    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const router = useRouter() 

    const [loading, setloading] = useState(false)

    const [groupedBasketTotal, setGroupedBasketTotal] = useState({} as { [key: string]: products[] })

    const checkOut = async () =>  {
        setloading(true)

        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
            "/api/checkout_session",
            { 
                items : items
            }
        );

        // Internal Error handling

        if ((checkoutSession as any).statusCode === 500) {
            console.error((checkoutSession as any).message);
            return 
        }

        // Redirect to checkput
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSession.id,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
        console.log(error.message);
        
        setloading(false)
    }

    useEffect(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item._id] = results[item._id] || [] ).push(item) 
        return results;
      }, {} as { [key: string]: products[] });

      setGroupedBasketTotal(groupedItems)
    }, [items])
    

  return (
    
    <div className='bg-[#e7Ecee] min-h-screen'>
        <Head>
            <title>Cart</title>
            <link rel="icon" href="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/800px-Jumpman_logo.svg.png" />
        </Head>
        <Header />
        <section className='mx-auto max-w-5xl pb-24'>
            <div className='px-5 my-8'>
                <h1 className='font-semibold text-2xl md:text-3xl font-sans'>
                    {items.length > 0 ? ("Your Cart Summary") : ("Your cart is empty") }
                </h1>
                {items.length === 0 && (
                    <button 
                    className='border my-4 p-2 px-16 border-gray-400 bg-black/90 hover:bg-black text-white rounded' 
                    onClick={() => router.push("/")}
                >
                    Countinue To shopping
                </button>
                )}
            </div>

            {items.length > 0 && (
                <div className=' md:border rounded border-gray-300 p-3 md:p-6'>
                    {Object.entries(groupedBasketTotal).map(([Key, item]) => (
                        <CheckoutPage key={Key} item={item} id={Key} />
                    ))}

                    <div className='p-4 right-10 flex justify-end'>
                        <p className='font-bold pr-8'>Subtotal : </p>
                        <p className='font-bold text-black'>  {basketTotal!}</p>
                    </div>
                    <div className='mx-auto flex justify-center'>
                        <button 
                            className='border p-2 px-28 border-gray-400 bg-black/90 hover:bg-black text-white rounded' 
                            onClick={checkOut}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}

        </section>
    </div>
  )
}

export default cartdetails