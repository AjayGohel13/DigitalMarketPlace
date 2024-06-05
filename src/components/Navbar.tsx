import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav.'
import Image from 'next/image'
import MobileNav from './MobileNav'

const Navbar = async () => {
    const nextCookiets = cookies()
    const { user } = await getServerSideUser(nextCookiets);
    return (
        <div>
            <div className=' sticky z-50 top-0 inset-x-0 h-16'>
                <header className='relative '>
                    <MaxWidthWrapper>
                        <div className="border-b border-gray-200  ">
                            <div className="flex h-16 items-center">
                                <div className="mt-1 flex lg:ml-0">
                                    <Link href='/'>
                                        <Image
                                            src="/AJLogo.png"
                                            height={40}
                                            width={40}
                                            alt="hippo email image"
                                        />
                                    </Link>
                                </div>
                                <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                                    <NavItems />
                                </div>



                                <div className="ml-auto flex items-center">

                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 text-black">
                                        <Link href='/'
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}>
                                            Home
                                        </Link>
                                        <Link href='/About-us'
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}>
                                            About Us
                                        </Link>
                                        <Link href='/Our-Services'
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}>
                                            Our-Services
                                        </Link>
                                        {user ? null : (
                                            <Link href='/sign-in'
                                                className={buttonVariants({
                                                    variant: 'ghost',
                                                })}>
                                                Sign in
                                            </Link>
                                        )}

                                        {user ? null : (
                                            <span
                                                className='h-6 w-px bg-gray-200'
                                                aria-hidden='true'
                                            />
                                        )}



                                        {user ? (
                                            <UserAccountNav user={user} />
                                        ) : (
                                            <Link
                                                href='/sign-up'
                                                className={buttonVariants({
                                                    variant: 'ghost',
                                                })}>
                                                Create account
                                            </Link>
                                        )}

                                        {user ? (
                                            <span
                                                className='h-6 w-px bg-gray-200'
                                                aria-hidden="true"
                                            />
                                        ) : null}

                                        {user ? null : (
                                            <div className='flex lg:ml-6'>
                                                <span
                                                    className='h-6 w-px bg-gray-200'
                                                    aria-hidden='true' />
                                            </div>
                                        )}
                                        <div className="flow-root ml-4 lg:ml-6">
                                            <Cart />
                                        </div>
                                    </div>
                                </div>
                                <MobileNav/>

                            </div>
                        </div>
                    </MaxWidthWrapper>

                </header>

            </div>

        </div>
    )
}

export default Navbar
