import { z } from "zod"

export const bookingFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bookings: z
    .array(
      z.object({
        service_category: z.string(),
        book_date: z.string(),
        book_time: z.string().optional(),
      }),
    )
    .min(1, "Please select at least one service"),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>

export interface SelectedService {
  serviceId: string
  serviceName: string
  categoryId: string
  categoryName: string
  cost: string
  hours: number
  date?: string
  time?: string
}

