"use client"

import { format } from "date-fns"

import {  useSearchParams } from "next/navigation"
import { useGetBookingDetails } from "./misc/api/BookingDetails"
import { MoneyTick } from "iconsax-react"
import { formatCurrency } from "@/utils/currency"

const PaymentSuccessPage = () => {
    const params = useSearchParams()

    const transaction_ref = params.get('ref')
    const { data } = useGetBookingDetails(transaction_ref!)

    return (
        <div className="relative w-full mx-auto flex max-2xl:flex-col items-center gap-12 gap-y-6 2xl:h-screen overflow-y-hidden 2xl:overflow-y-scroll bg-[#0E0E0E] ">
            <section className="flex flex-col pt-12 leading-tight 2xl:h-screen 2xl:max-h-full 2xl:w-2/5 overflow-hidden lg:sticky top-0 2xl:justify-center items-center p-6">
                <MoneyTick className="text-white/80 size-28 lg:size-40" />

                <p className="text-[6rem] lg:text-[10rem] leading-none font-bebas text-[#FFFFFF21]">
                    PAYMENT
                </p>
                <p className="text-[6rem] lg:text-[8rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
                    SUCCESSFUL
                </p>
            </section>

            <section className="flex flex-col gap-4 2xl:max-h-full max-2xl:items-center w-full 2xl:w-3/5 p-4 md:p-6 2xl:py-20 xl:px-12">
                <section className="flex flex-col gap-2 text-white">
                    <h3 className="text-xl font-medium">Booking Details</h3>
                    <article>
                        <p className="text-sm">Client Name: {data?.booking_details[0].client_first_name} {data?.booking_details[0].client_last_name}</p>
                        <p className="text-sm">Client Email: {data?.transaction_details.customer_email} </p>
                        <p>{data?.transaction_details.payment_status}</p>
                    </article>
                    <div className="w-max overflow-x-auto text-white/80 border-[0.5px] border-[#FFFFFF21] rounded-xl">
                        <table className="w-full border-collapse max-w-max ">
                            <thead className="rounded-t-2xl">
                                <tr className="bg-[#FFFFFF21] border-b-[0.5px] border-b-[#FFFFFF21] text-sm px-5">
                                    <th className="font-medium py-3 px-5 text-left">Booking ID</th>
                                    <th className="font-medium py-3 px-5 text-left">Service Type</th>
                                    <th className="font-medium py-3 px-5 text-left">Booking Date</th>
                                    <th className="font-medium py-3 px-5 text-left">Total Price</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {data?.booking_details.map((booking, index) => (
                                    <tr key={index} className="px-5 border-b-[0.5px] border-b-[#FFFFFF21] text-sm">
                                        <td className="font-normal py-3 px-5">{booking.id.substring(0, 4)}***{booking.id.substring(booking.id.length - 4, booking.id.length)}</td>
                                        <td className="font-normal py-3 px-5">{`${booking.service_type_name} - ${booking.sub_category_name}`}</td>
                                        <td className="font-normal py-3 px-5">{format(new Date(booking.book_date), "dd/MM/yyyy")}</td>
                                        <td className="font-normal py-3 px-5">{formatCurrency(Number(booking.total_price), 'GBP')}</td>
                                    </tr>
                                ))}

                                <tr className="px-5 text-sm">
                                    <td className="py-3 px-5"></td>
                                    <td className="py-3 px-5"></td>
                                    <td className="font-semibold py-3 px-5 text-[0.925rem]">Total</td>
                                    <td className="font-semibold py-3 px-5 text-[0.925rem]">{formatCurrency(Number(data?.transaction_details.amount), 'GBP')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="flex flex-col gap-2 text-white">
                    <h3 className="text-xl font-medium">Payment Details</h3>
                    <section className="flex flex-col gap-2">
                        <p className="text-sm">Amount Paid: {data?.transaction_details.amount}</p>
                        <p className="text-sm">Payment Method: {data?.transaction_details.payment_status}</p>
                        <p className="text-sm">Transaction Reference: {data?.transaction_details.transaction_ref}</p>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default PaymentSuccessPage

