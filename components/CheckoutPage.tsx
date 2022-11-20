import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../redux/basketSlice'
import { urlFor } from '../sanity'
import { products } from '../typings'

type Props = {
    item : products[]
    id : any
}



function CheckoutPage({item, id}: Props) {

    const dispatch = useDispatch();

    const removeitem = () => {
        dispatch(removeFromBasket({id}));
        toast.error(`${item[0].title} Removed from cart`, {
        position: 'bottom-left' ,
    })
    } 
    
  return (
    <div className='px-4 flex  border-b items-center py-2 md:py-0 justify-between border-gray-300 '> 
        <div className='flex flex-col md:flex-row md:items-center '>
            <div className='relative h-36 w-36'>
            <Image 
                src={urlFor(item[0].image).url()}
                alt="image"
                layout="fill"
                objectFit="contain"
            />
            </div>
                <div className='flex flex-col space-y-1 '>
                    <h2 className='font-medium text-base'>{item[0].title}</h2>
                    <div className='flex space-x-4'>
                        <p className='font-bold text-sm'>Brand: <span className='font-medium'>{item[0].brand}</span></p>
                        <p className='font-bold text-sm'>Color: <span className='font-medium'>{item[0].colour}</span></p>
                        <p className='font-bold text-sm'>$: <span className='font-medium'>{item[0].price}</span> </p>
                    </div>
                    <div className='flex space-x-4'>
                        <p className='font-bold text-sm'>Qty : <span className='font-medium'>{item.length}</span></p>
                        <button className=' text-sm text-black/80 hover:text-black' onClick={removeitem}>Remove</button>
                    </div>
                </div>
        </div>
    
            <div className=''>
                <p className=' font-bold '>$ : {item.reduce((total, item) => total + item.price, 0)}</p>
            </div>
    </div>
  )
}

export default CheckoutPage