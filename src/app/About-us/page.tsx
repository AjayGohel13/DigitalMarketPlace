import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { CalendarClock, PackageSearch, ReceiptIndianRupee, UserCog } from 'lucide-react'

import React from 'react'

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>

                <section className="text-gray-700 body-font pt-10 bg-green-100">
                    <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
                        Why Us?
                    </div>
                    <div className="container px-5 py-12 mx-auto">
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="p-4 md:w-1/4 sm:w-1/2">
                                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                                    <div className="flex justify-center">
                                        <PackageSearch size={88} className='mb-5' />
                                    </div>
                                    <h2 className="title-font font-regular text-2xl text-gray-900">Latest Products</h2>
                                </div>
                            </div>

                            <div className="p-4 md:w-1/4 sm:w-1/2">
                                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                                    <div className="flex justify-center">
                                        <ReceiptIndianRupee size={88} className='mb-5' />                                    </div>
                                    <h2 className="title-font font-regular text-2xl text-gray-900">Reasonable Rates</h2>
                                </div>
                            </div>

                            <div className="p-4 md:w-1/4 sm:w-1/2">
                                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                                    <div className="flex justify-center">
                                        <CalendarClock size={88} className='mb-5' />
                                    </div>
                                    <h2 className="title-font font-regular text-2xl text-gray-900">Free Delivery</h2>
                                </div>
                            </div>

                            <div className="p-4 md:w-1/4 sm:w-1/2">
                                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                                    <div className="flex justify-center">
                                        <UserCog size={88} className='mb-5' />
                                    </div>
                                    <h2 className="title-font font-regular text-2xl text-gray-900">Become Host</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </MaxWidthWrapper>

    )
}

export default page
