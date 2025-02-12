'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useGetBookingDetails } from './misc/api/BookingDetails'
import { MoneyTick } from 'iconsax-react'

const PaymentSuccessPage = () => {
const params  =  useSearchParams()
const transaction_ref = params.get('ref')
const {data} = useGetBookingDetails(transaction_ref!)
console.log(data)
    return (
        <div className=" relative w-full mx-auto flex max-lg:flex-col items-center gap-12 lg:h-screen lg:justify-center overflow-y-hidden bg-[#0E0E0E] lg:p-20 text-white">
            <header className="flex flex-col items-center gap-2.5">
                <MoneyTick size={60}/>
                <h2 className="text-2xl font-medium uppercase">
                    Payment Successful
                </h2>
            </header>
        </div>
    )
}

export default PaymentSuccessPage