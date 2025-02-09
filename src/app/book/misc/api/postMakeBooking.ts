import { BookingAppAxios } from "@/utils/axios"
// import { BookingFormValues } from "../lib/schema"
import { useMutation } from "@tanstack/react-query"
type payload ={
    bookings: {
        service_category: string;
        book_date: string | undefined;
    }[];
    first_name: string;
    last_name: string;
    email: string;
}

const makeBooking = async(data:payload)=>{
    const res = await BookingAppAxios.post("/studio/bookings/", data)
    return res.data as TBookingAPIResponse
}

export const useMakeBooking =()=>{
    return useMutation({
        mutationFn:makeBooking,
        mutationKey: ['make-booking']
    })
}

interface TBookingAPIResponse {
  message: string;
  availability: Availability[];
  checkout_url: string;
}

interface Availability {
  service: string;
  category: string;
  book_date: string;
  status: string;
}