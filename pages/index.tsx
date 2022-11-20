import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Landing from '../components/Landing'

import { FetchCategories } from '../utils/FetchCategories'
import { FetchProducts } from '../utils/FetchProducts'
import { categories, products } from '../typings'
import Section from '../components/Section'
import Cart from "../components/Cart"
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface Props {
  categories : categories[]
  products : products[]
  session : Session | null
}

const Home = ({categories, products,}: Props) => {


  return (
    <div className="">
      <Head>
        <title>Jordan Store</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/800px-Jumpman_logo.svg.png" />
      </Head>
      <Header />
        <Cart />
      {/* Main Section */}
      <main id='hero'className='bg-[#e7Ecee] relative h-[200vh]'>
        <Landing />
      </main>
      <section id='products' className='relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]'>
        <Section 
          categories={categories} 
          products = {products}
        />
      </section>
      {/* Shopping cart */}

    </div>

  )
}

export default Home


export const getServerSideProps : GetServerSideProps = async (context) => {

  const categories : categories[] = await FetchCategories();
  const products : products[] = await FetchProducts();
  const session = await getSession(context);
  return {
    props : {
        categories,
        products,
        session
    }
  }

}