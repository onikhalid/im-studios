'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useGetBookingDetails } from './api/BookingDetails'

const PaymentSuccessPage = () => {
const params  =  useSearchParams()
const transaction_ref = params.get('ref')
const {data} = useGetBookingDetails(transaction_ref!)
console.log(data)
    return (
        <div className=" relative w-full mx-auto flex max-lg:flex-col items-center gap-12 lg:h-screen overflow-y-hidden bg-[#0E0E0E] lg:p-20 ">
            PaymentSuccessPage
        </div>
    )
}

export default PaymentSuccessPage