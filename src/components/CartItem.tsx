import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import {  Product } from '@/payload-types'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



const CartItem = ({product}:{product: Product}) => {
  const {image} = product.images[0] 
  
  const {removeItem} = useCart()
  return (
    <div className='space-y-3 py-2'>
      <div className="flex items-center justify-between gap-4 ">
        <div className="flex items-center space-x-4 ">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded  ">
            {typeof image !=="string" && image.url?(
              <Image src={image.url}
              alt={product.Name_Of_Product}
              fill
              className='absolute object-cover  '
              />
            ):(
              <div className="flex h-full items-center justify-center be-secondary ">
                <ImageIcon aria-hidden="true" 
                className='h-4 w-4 text-muted-foreground'
                 />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start ">
            <span className="line-clamp-1 text-sm font-medium ">{product.Name_Of_Product}
            </span>

              <div className="mt-4 text-x5 text-muted-foreground ">
                <button className='flex items-center gap-0.5 ' onClick={()=>removeItem(product.id)} ><X className='w-3 h-4' />Remove</button>
              </div>
          </div>
        </div> 
        <div className="flrx flex-col space-y-1 font-medium ">
          <div className="ml-auto line-clamp-1 text-sm ">
          {formatPrice(product.Price)}

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CartItem
