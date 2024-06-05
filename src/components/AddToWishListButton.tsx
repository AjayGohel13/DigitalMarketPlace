"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {  Product } from "@/payload-types"
import { useCart } from "@/hooks/use-cart"
import { Heart } from "lucide-react"

const AddToCartButton = ({ product }:
    {
        product: Product
    }) => {
    const { addItem } = useCart()

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000);
        return () => clearTimeout(timeout)
    }, [isSuccess])


    return (
        <Button onClick={() => {
            addItem(product)
            setIsSuccess(true)
        }}
            className="bg-green-400 text-gray-900 hover:bg-green-500"
            size='lg'  >
            {isSuccess ? 'Added' : 'Add to WishList'}  
            {" "}{" "}{" "}<Heart fill="black" className="ml-3" aria-hidden='true'  />
        </Button>)
}

export default AddToCartButton
