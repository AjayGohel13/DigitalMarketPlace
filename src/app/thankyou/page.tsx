import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { getPayloadClient } from '@/get-payload'
import {   Product } from '@/payload-types'
import Link from 'next/link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaymentStatus from '@/components/PaymentStatus'
import PDFGenerator from '@/components/pdfForpeoduct'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = async ({
  searchParams,
}: PageProps) => {
  const orderId = searchParams.orderId
  const nextCookies = cookies()

  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 1,
    where: {
      id: {
        equals: orderId,
      },
      user:{
        equals:user?.id
      }
    },
  })
  const [order] = orders

  if (!order) return notFound()

  const orderUserId =
    typeof order.user === 'string'
      ? order.user
      : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(
      `/sign-in?origin=thankyou?orderId=${order.id}`
    )
  }

  const food = order.product as Product[]


  const orderTotal = food.reduce((total, product) => {
    return total + parseInt(product.Price)
  }, 0)


const fee= 50
  const dis = orderTotal*10/100

  const subtotal = orderTotal

  let totalPrice =orderTotal - dis


  return (
    <MaxWidthWrapper>
    <main className='relative lg:min-h-full flex flex-col'>
      <div className='flex justify-between items-center' >
        <div className='hidden lg:block overflow-hidden lg:absolute lg:h-100 lg:w-1/2 lg:pr-4 xl:pr-12'>
          <Image
            className=" w-100"
            src="/AJLogo.png"
            height={800}
            width={800}
            alt="logo" />
        </div>

        <div>
          <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
            <div className='lg:col-start-2'>
              <p className='text-sm font-medium text-blue-600'>
                Order successful
              </p>
              <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                Thanks for Ordering
              </h1>
              {order._isPaid ? (
                <p className='mt-2 text-base text-muted-foreground'>
                  Your order was processed and your Product will
                  Deliver to you&apos;r Address in seven Days;. We&apos;ve sent
                  your receipt and order details to{' '}
                  {typeof order.user !== 'string' ? (
                    <span className='font-medium text-gray-900'>
                      {order.user.email}
                    </span>
                  ) : null}
                  .
                </p>
              ) : (
                <p className='mt-2 text-base text-muted-foreground'>
                  We appreciate your order, and we&apos;re
                  currently processing it. So hang tight and
                  we&apos;ll send you confirmation very soon!
                </p>
              )}

              <div className='mt-16 text-sm font-medium'>
                <div className='text-muted-foreground'>
                  Order No.
                </div>
                <div className='mt-2 text-gray-900'>
                  {order.id}
                </div>
                <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p className='text-gray-900'>
                      {formatPrice(subtotal)}
                    </p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Transaction Fee</p>
                    <p className='text-gray-900'>
                      {formatPrice(50)}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span> </p>
                    <p className='text-gray-900'>
                      {formatPrice(dis)}
                    </p>
                  </div>

                  <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                    <p className='text-base'>Total</p>
                    <p className='text-base'>
                      {formatPrice(totalPrice)}
                    </p>
                  </div>
                  <div className=' border-t border-gray-200 pt-6 text-gray-900'>
                    <p className='text-base font-bold'>Note:</p>
                    <p className='text-base'>
                      Discount money well be deposit to you&apos;r Account after the product hass been delivered
                    </p>
                  </div>
                </div>
                <PaymentStatus orderEmail={user.email} isPaid = {order._isPaid} orderId={order.id} />
                <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                  <Link
                    href='/product'
                    className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                    Checkout More &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>
      </div>
      </div>

      <div className='pb-20'>
        {(order.product as Product[]).map(
          (prod)=>{
            return(
              <PDFGenerator key={order.id} Email={user.email} id={order.id} Name_Of_Product={prod.Name_Of_Product}  City_Name={user.City_Name} State_Name={user.State_Name} Address={user.Address} Pincode={user.Pincode} country={user.Country} price={prod.Price} Contect_Number={user.Contect_Number} category={prod.category} user_name={user.user_name} />
            )
          }
        )}
        
      </div>
    </main>
    </MaxWidthWrapper>
  )
}

export default ThankYouPage