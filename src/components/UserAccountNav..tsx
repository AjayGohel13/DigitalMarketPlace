"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { User } from "../payload-types"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

const UserAccountNav = ({user}:{user: User}) => {
    const {signOut} = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger
         asChild 
         className="overflow-visible ">
            <Button 
            variant='ghost'
             size='sm'
              className="relative">
                My Account
                </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-60 " align="end" >
            <div className="flex items-center justify-start gap-2 p-2 ">
                <p className="flex flex-col space-y-0 lesding-none " >{user.email}</p>
            </div>
            <DropdownMenuSeparator/>

            <DropdownMenuItem asChild className="cursor-pointer" >
                <Link href= "/sell">Register Your Place</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={signOut} >
                Logout
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer" >
                <Link href= "/about-us">About Us </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer" >
                <Link href={`/user/${user.id}`}> Check Your Orders </Link>
            </DropdownMenuItem>      

        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserAccountNav
