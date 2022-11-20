import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsCheck2 } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive';
import { AiOutlineShoppingCart, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { GetServerSideProps } from 'next';
import { stripeProducts } from '../typings';
import {FetchLineItems} from "../utils/FetchLineItems"
import Button from '../components/Button';
import { useSession } from 'next-auth/react';


interface Props {
  products : stripeProducts[]
}

function success({products}: Props ) {
  const { data: session } = useSession()
  
  const router = useRouter()
  const [mounted, setmounted] = useState(false)
  const [showOrderSummary, setshowOrderSummary] = useState(false)

  const {sessionId } = router.query  

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  console.log(products);
  

  const handleshowSummary = () => {
    setshowOrderSummary(!showOrderSummary)
  }

  const subtotal = products.reduce((total, product) => total + product.price.unit_amount / 100, 0)

  useEffect(() => {
   setmounted(true)
  }, [])
  

  return (
    <div className=' min-h-screen'>
         <Head>
            <title>Thank You | JordanStore</title>
            <link rel="icon" href="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/800px-Jumpman_logo.svg.png" />
        </Head>

        <header className='ml-4 p-1 '>
          <Link href='/'>
                  <div className='relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden' >
                      <Image
                          src="https://1000logos.net/wp-content/uploads/2016/10/Colors-Air-Jordan-Logo.jpg"
                          layout='fill'
                          objectFit='contain'
                          alt='text'
                      />
                  </div>
            </Link>
        </header>

        <main className='grid grid-col-1 lg:grid-cols-9'>
          <section className='order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>       
            <Link href='/'>
                  <div className='relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex"' >
                      <Image
                          src="https://1000logos.net/wp-content/uploads/2016/10/Colors-Air-Jordan-Logo.jpg"
                          layout='fill'
                          objectFit='contain'
                          alt='text'
                      />
                  </div>
            </Link>
          <div className='flex space-x-4 my-8 mx-4 lg:mx-14 '>
            <div className='flex h-11 w-11 items-center justify-center border-2 border-black rounded-full text-lg p-1'>
                <BsCheck2 className='h-8 w-8' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Order #{sessionId?.slice(-5)}</p>
              <h2 className='text-lg'>Thank You {session ? session?.user?.name  : "Guest" }</h2>
              
            </div>
          </div>
          <div className=' mx-4 divide-y divide-gray-400 rounded-lg border border-gray-400 p-2'>
            <div className='pt-4 pb-2'>
              <p className='text-lg'>Your Order is Confirmed</p>
              <p className='text-sm text-justify'>we've accepted your order, and we're getting it ready. Come back to this page for updates on your shipment status</p>
            </div>
            <div className='py-3 '>
              <p className='text-lg'>Order Number</p>
              <p className='text-sm'>#cb3565sdjg</p>
            </div>
          </div>
          <div className=' mx-4 mt-4 divide-y divide-gray-400 rounded-lg border border-gray-400 p-2'>
            <div className='pt-4 pb-2'>
              <p className='text-lg'>Order Updates</p>
              <p className='text-sm'>You'll get the shipment details and deliver updates by Email</p>
            </div>
            <div className='py-3 hidden lg:inline-flex flex-col'>
              <p className='text-sm'>Need help? Contact us on jordanstorehelpline@gmail.com</p>
            </div>
          </div>

          <div className='flex mx-auto max-w-xl items-center justify-center my-3 '>
            <button 
              className='border p-2 px-28 border-gray-400 bg-black/90 hover:bg-black text-white rounded' 
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </div>
          </section>

          {mounted && (
            <section className='  border-y border-1  bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0 border-gray-300'>
              <div className={` ${showOrderSummary && "border-b "} border-gray-300 text-sm lg:hidden mx-4` }>
                <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                  <button 
                    className='flex space-x-2 items-center'
                    onClick={handleshowSummary}
                  >
                    <AiOutlineShoppingCart className='h-4 w-4'/>
                    <p>Show order summary</p>
                      {showOrderSummary ? <AiOutlineUp className='h-4 w-4'/> : <AiOutlineDown className='h-4 w-4' />}
                  </button>
                  <p className='text-xl font-medium text-black'>
                   $ {subtotal + subtotal/100 * 18}
                  </p>
                </div>
              </div>
              {showOrderSummaryCondition && (
                 <div className='mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                    <div className='space-y-4 pb-4'>
                        {products.map((product) => (
                          <div key={product.id} className="mx-2 flex items-center space-x-4 text-sm font-medium">
                              <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white'>
                                <div className='relative h-7 w-7 animate-bounce rounded-md'>
                                <Image
                                    src="https://1000logos.net/wp-content/uploads/2016/10/Colors-Air-Jordan-Logo.jpg"
                                    layout="fill"
                                    objectFit="contain"
                                    alt='any'
                                  />
                                </div>
                                <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs'>
                                  {product.quantity}
                                </div>
                              </div>
                                <p className='flex-1'>
                                  {product.description}
                                </p>
                                <p className=''>
                                  {product.price.unit_amount / 100}
                                </p>
                          </div>
                        ))}
                    </div>
                    <div className=''>
                      <div className='flex justify-between gap-2 items-center mx-2'>
                        <p className='text-[gray] items-center'>Amount</p>
                        <p className='text-[gray] items-center'>$ {subtotal}</p>
                      </div>
                      <div className='flex justify-between gap-2 items-center mx-3'>
                        <p className='text-xs items-center text-[black]/80'>Discount</p>
                        <p className='text-xs items-center text-[black]/80'>$ 0.00</p>
                      </div>
                      <div className='flex justify-between mx-3 gap-2 items-center'>
                        <p className='text-xs items-center text-[black]/80'>VAT 18% </p>
                        <p className='text-xs items-center text-[black]/80'>$ {subtotal/100*18}</p>
                      </div>
                    </div>
                      <div className='flex justify-between pt-2 items-center font-medium gap-2 mx-2'>
                        <p className='text-[black] items-center'>Sub Total</p>
                        <p className='text-[black] items-center'>$ {subtotal + subtotal/100*18}</p>
                      </div>
                 </div> 
              )}
            </section>
          )}
        </main>
    </div>
  )
}

export default success

export const getServerSideProps : GetServerSideProps = async ({query}) => {

  const sessionId = query.sessionId as string;
  const products = await FetchLineItems(sessionId)

  return {
    props: {
      products
    }
  }
}
