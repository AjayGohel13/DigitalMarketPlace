"use client"
import React, { useEffect } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Heart } from 'lucide-react';
import { Separator } from './ui/separator';
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useState } from 'react'
import { useCart } from '@/hooks/use-cart';
import CartItem from './CartItem';
import { ScrollArea } from './ui/scroll-area';

const Cart = () => {
    const { items } = useCart()

    const itemCount = items.length
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const cartTotal = items.reduce((total, { product }) =>  parseInt( total + product.Price),
        0
    )
    const fee = 1

    return (
        <div>
            <Sheet>
                <SheetTrigger className='group m-2 flex items-center p-2'>
                    <Heart
                        aria-hidden='true'
                        className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                        {isMounted ? itemCount : 0}
                    </span>
                </SheetTrigger>
                <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg bg-green-100'>
                    <SheetHeader className='space-y-2.5 pr-6'>
                        <SheetTitle> WishList({itemCount})</SheetTitle>
                    </SheetHeader>
                    {itemCount > 0 ? (
                        <>
                            <div className="flex w-full flex-col pr-6">
                                <ScrollArea>
                                    {items.map(({ product }) => (
                                        <CartItem product={product} key={product.id} />
                                    ))}
                                    WishList Items
                                </ScrollArea>

                            </div>
                            <div className="space-y-4 pr-6">
                                <Separator />

                                <SheetFooter>
                                    <SheetTrigger asChild>
                                        <Link href='/wishlists' className={buttonVariants({
                                            className: 'w-full',
                                        })}>Continue to checkout</Link>
                                    </SheetTrigger>
                                </SheetFooter>
                            </div>
                        </>

                    ) : (

                        <div className='flex h-full flex-col items-center justify-center space-y-1'>
                            <div aria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
                            </div>
                            <div className="text-xl font-semibold">Your WishList is Empty</div>
                            <SheetTrigger asChild>
                                <Link href="/product"
                                    className={buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: 'text-sm text-muted-foreground',
                                    })}>Add items to your WishList</Link>
                            </SheetTrigger>
                          
                        </div>
                    )}
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Cart
