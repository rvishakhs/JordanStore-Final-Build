import Link from 'next/link';
import React from 'react'
import { AiOutlineShopping } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../redux/basketSlice';

type Props = {}

function Cart({}: Props) {

    const items = useSelector(selectBasketItems)

    if(items.length === 0 ) return null; 

  return (
    <Link href="/cartdetails">
        <div 
            className=' transition-all duration-300 fixed bottom-8 right-8 
                md:bottom-10 md:right-10 z-50 flex h-12 w-12 md:h-16 md:w-16 cursor-pointer items-center 
                justify-center rounded-full bg-gray-300 order'
        >
                    <span className=' text-xs font-medium  absolute -right-1 -top-1 z-60 flex h-5 w-5 
                    items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500'>{items.length}</span>
                    <AiOutlineShopping className=' h-7 w-7 cursor-pointer'/>
        </div>
    </Link>
  )
}

export default Cart