"use client"
import { usePDF } from 'react-to-pdf';

import React from 'react'
import {  User } from '@/payload-types';
import { Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { formatPrice } from '@/lib/utils';
interface PageProps {
    description?: (string | null) |undefined
    Name_Of_Product: string  | null|undefined;
    category:  (string | null)  |undefined;
    Contect_Number?: (string | null) |undefined;
    Address?: (string | null)  |undefined;
    Pincode?: (string | null)  |undefined;
    State_Name?: (string | null) |undefined;
    City_Name?: (string | null)  |undefined;
    country?: (string | null)  |undefined;
    id: string;
    user_name:string;
    Email:string,
    price:string
}
const PDFGenerator = ({ Name_Of_Product, price,City_Name, State_Name, Address,user_name, Pincode, country, Contect_Number,category ,id ,Email}: PageProps) => {
    const { toPDF, targetRef } = usePDF({ filename: 'Receipt.pdf' });
    return (
        <div>
            <div className='flex'>
                <Button onClick={() => toPDF()}>Download PDF</Button>
            </div>
            <div>
                {<div ref={targetRef} >

                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">{Name_Of_Product?.toString()}</h3>
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">User Name:</p>
                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{user_name}</p>
                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600 font-bold">Order ID:</p>
                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{id}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <Mail />
                                    <p className="cursor-pointer text-sm leading-5 ">{Email}</p>
                                </div>
                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <Phone className=' ' />
                                    <p className="cursor-pointer text-sm leading-5 ">{Contect_Number?.toString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800"> Address:</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{Address?.toString()},{City_Name?.toString()},{State_Name?.toString()},{country?.toString()},{Pincode?.toString()}</p>
                                    </div>
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800"> Category:</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{category?.toString()}</p>
                                    </div>
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Price </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{formatPrice(Number(price))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default PDFGenerator
