import { BookingAppAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const getDetails = async (transaction_ref?: string) => {
    const res = await BookingAppAxios.get(`/booking-details/?transaction_ref=${transaction_ref}`)
    return res.data as TAPIResponse
}


export const useGetBookingDetails = (transaction_ref?: string)=> {
    return useQuery({
        queryFn: () => getDetails(transaction_ref),
        queryKey: ['get-booking-details'],
        enabled: !!transaction_ref
    })
}

interface TAPIResponse {
  transaction_details: Transactiondetails;
  booking_details: Bookingdetail[];
}

interface Bookingdetail {
  id: string;
  client: string;
  client_first_name: string;
  client_last_name: string;
  service_category: string;
  service_category_name: string;
  service_type_name: string;
  sub_category_name: string;
  sub_category_cost: string;
  book_date: string;
  start_time: null | string;
  end_time: null | string;
  total_price: string;
  book_payment_status: string;
  is_book_active: string;
  promo: null;
  notes: null;
}

interface Transactiondetails {
  transaction_ref: string;
  payment_status: string;
  transaction_status: string;
  amount: string;
  customer_email: string;
  created_at: string;
  updated_at: string;
}