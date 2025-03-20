'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useGetBookingDetails } from './api/BookingDetails'
import { MoneyRemove } from 'iconsax-react'

const PaymentSuccessPage = () => {
    const params = useSearchParams()
    const transaction_ref = params.get('ref')
    const { data } = useGetBookingDetails(transaction_ref!)
    console.log(data)
    return (
        <div className=" relative w-full mx-auto flex max-lg:flex-col items-center gap-12 lg:h-screen overflow-y-hidden bg-[#0E0E0E] lg:p-20 ">
            <section className="flex flex-col pt-12 leading-tight 2xl:h-screen 2xl:max-h-full 2xl:w-2/5 overflow-hidden lg:sticky top-0 2xl:justify-center items-center p-6">
                <MoneyRemove className="text-white/80 size-28 lg:size-40" />

                <p className="text-[6rem] lg:text-[6.5rem] leading-none font-poppins text-white -translate-y-[30%] lg:-translate-y-[50%]">
                    PAYMENT FAILED
                </p>
            </section>
        </div>
    )
}

export default PaymentSuccessPage