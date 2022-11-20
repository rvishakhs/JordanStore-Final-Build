import React from 'react'
import { Tab } from '@headlessui/react'
import { categories, products } from '../typings'
import Product from './Product'

interface Props {
    categories : categories[]
    products : products[]
  }

export default function Section({categories, products}: Props) {

    const showProducts = (category: number) => {
        return products 
        .filter((product) => product.category._ref === categories[category]._id)
        .map((product) => <Product product={product} />)
    }
  return (
    <div className='space-y-4 py-6'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white'>
            NEW PROMOS
          </h1>
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-3">
              {categories.map((category, index ) => (
                <Tab 
                    key={index}
                    className={({selected}) => `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base
                     ${
                        selected
                          ? "borderGradient bg-[#35383C] text-white"
                          : "border-b-2 border-[#35383C] text-[#747474]"
                      }`
                    }
                >
                    {category.title}
                </Tab>
              ))}

            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm-px-4">
              <Tab.Panel className="tabcontainer">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabcontainer">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabcontainer">{showProducts(2)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
  )
}