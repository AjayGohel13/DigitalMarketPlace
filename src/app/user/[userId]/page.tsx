import ImageSlider from '@/components/imageSlider'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { notFound } from 'next/navigation'

interface pageProps {
  params: {
    userId: string
  }
}
const page = async ({ params }: pageProps) => {
  const { userId } = params
  const payload = await getPayloadClient()
  const { docs: order } = await payload.find({
    collection: 'orders',
    limit: 10,
    where: {
      user: {
        equals: userId
      }
    }
  })

  const [orders] = order

  if (!orders) return notFound()
  
  const { docs: user } = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      id: {
        equals: userId
      }
    }
  })
  const [users] = user

  const cartTotal = (orders.product as Product[]).reduce(
    (total, { Price }) => total + Number(Price),
    0
  )
  const dis = cartTotal * 10 / 100
  const shippingFee = 50
  const totalPrice = Number(cartTotal - dis + shippingFee)
  console.log(cartTotal)
  console.log(totalPrice)

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">{orders.id}</h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{orders.createdAt}</p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {(orders.product as Product[]).map(((products) => {
              console.log(Number(products.Price) + 1000)
              const validUrls = products.images.map(({ image }) =>
                typeof image === "string" ? image : image.url)
                .filter(Boolean) as string[]
              return (<div key={products.id} className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer&apos;s Orders</p>
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <ImageSlider urls={validUrls} />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{products.Name_Of_Product}</h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> {products.Style}</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> {products.Size}</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> {products.Color}</p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base dark:text-white xl:text-lg leading-6">{formatPrice(Number(products.Price))} <span className="text-red-300 line-through"> {formatPrice((Number(products.Price) + 1000))}</span></p>
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                      <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{formatPrice(Number(products.Price))}</p>
                    </div>
                  </div>
                </div>
              </div>)
            }))}
            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">

              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formatPrice(cartTotal)}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formatPrice(dis)} (10%)</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formatPrice(shippingFee)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Note:</p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">You&apos;ll receive Discount money After Delivery </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">{formatPrice(80)}</p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{users.user_name}</p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">1 Previous Orders</p>
                  </div>
                </div>
                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <Mail className='font-bold' />
                  <p className="cursor-pointer text-sm leading-5 ">{users.email}</p>
                </div>
                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <Phone className='font-bold' />
                  <p className="cursor-pointer text-sm leading-5 ">{users.Contect_Number}</p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{users.Address}{' '},{' '}{users.City_Name}{' '},{' '}{users.State_Name}{' '},{' '}{users.Country}{' '},{' '}{users.Pincode}</p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{users.Address}{' '},{' '}{users.City_Name}{' '},{' '}{users.State_Name}{' '},{' '}{users.Country}{' '},{' '}{users.Pincode}</p>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Explore More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default page
