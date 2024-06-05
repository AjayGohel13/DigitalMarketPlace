import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div>
            <MaxWidthWrapper>

                <section className="py-10" id="services">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-green-100 rounded-lg shadow-md overflow-hidden">
                                <Image src='/delivery.jpg'
                                    alt='delivery image'
                                    height={300}
                                    width={300}
                                    className="w-full h-64 object-cover" />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Free Delivery</h3>
                                    <p className="text-gray-700 text-base">Users can choose preferred delivery windows (e.g., morning, afternoon, evening).
                                        Helps manage delivery logistics efficiently.
                                        Reduces waiting time for customers.Especially relevant during pandemic times.
                                        Couriers leave orders at the doorstep without direct contact.</p>
                                </div>
                            </div>
                            <div className="bg-green-100 rounded-lg shadow-md overflow-hidden">
                                <Image src='/quality.jpeg'
                                    alt='delivery image'
                                    height={400}
                                    width={300}
                                    className="w-full h-64 object-center" />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Better Quality</h3>
                                    <p className="text-gray-700 text-base">Our gram flour is perfect for a variety of uses, including
                                        baking, cooking, and making snacks. It is also a good source of protein and fiber.Our gram flour
                                        grinding service is a convenient and affordable way to get the freshest gram flour possible.</p>
                                </div>
                            </div>
    
                            <div className="bg-green-100 rounded-lg shadow-md overflow-hidden">
                                <Image src='/collaboration.jpeg'
                                    alt='delivery image'
                                    height={300}
                                    width={300}
                                    className="w-full h-64 object-cover" />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Good Collaboration</h3>
                                    <p className="text-gray-700 text-base">Be part of the hype with exclusive drops. AJ collaborates with artists, designers, and athletes to create unique pieces. Collaborators with varied backgrounds bring fresh ideas and innovative solutions.
                                        <details>
                                            <summary>Read More</summary>
                                            <p> Acknowledge achievements and milestones as a team.
                                                Celebrate both small victories and major accomplishments.</p>
                                        </details>
                                    </p>
                                </div>
                            </div>
                            <div className=" bg-green-100 rounded-lg p-0.5 shadow-lg overflow-hidden min-h-full">
                                    <Image src='/Refund.jpeg'
                                    alt='delivery image'
                                    height={300}
                                    width={300}
                                    className="w-full h-64 object-cover" />
                                <div className="p-6  text-center rounded-b-lg md:min-h-full">
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Gauranteed Refund</h3>
                                    <p className="text-gray-700 text-base"><span className="font-medium underline">Our speciality is</span>
                                        Bappa Flour Mill offers a variety of flavored spaghetti dishes that are sure to tantalize your
                                        taste
                                        buds. We use only the freshest ingredients Our
                                        flavors include: Mango, spinach
                                    </p>
                                </div>
                            </div>

                  

                        </div>
                    </div>
                </section>
            </MaxWidthWrapper>
        </div>
    )
}

export default page
