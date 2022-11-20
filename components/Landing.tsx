import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion"
import Button from './Button'
import Link from 'next/link'

type Props = {}

export default function Landing({}: Props) {
  return (
    <section className='sticky  mx-auto flex items-center justify-between top-0 h-screen mx-w-[1350px] px-8 lg:px-12'>
      <div className='space-y-6'>
        <h1 className='space-y-3 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide'>
          <span className='block  font-black text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-red-500'>
            MIDNIGHT NAVY
          </span>
          <span className='block'>
            RETRO EDITION 
          </span>
          <span className=''>
            AIR JORDAN 
          </span>
          <span className=' text-red-600'> 11</span>
        </h1>
        <div className='space-x-4'>
          <Link href="#products">
            <button 
                className='border p-2 px-28 border-gray-400 bg-black/90 hover:bg-black text-white rounded' 
              >
                Products
              </button>
          </Link>
          <button className='link '> Learn More </button>
        </div>
      </div>
      <motion.div 
        className='relative hidden  transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]'
        initial={{
          y: -200,
          x: 200,
          opacity: 0
          }}

          transition = {{
              duration: 1  
          }}

          whileInView = {{
              opacity: 1,
              x:1,
              y: 1,
          }}

          viewport ={{
              once: true
          }}
      >
        <Image
          src='/jordannew.png'
          alt='text'
          layout='fill'
          objectFit='contain'
        />
      </motion.div>
    </section>
  )
}