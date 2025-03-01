import { z } from "zod"

export const bookingFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bookings: z
    .array(
      z.object({
        service_category: z.string(),
        sub_category_package: z.string().optional(),
        book_date: z.string(),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Please select at least one service"),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>

export interface SelectedService {
  serviceId: string
  serviceName: string
  subCategoryName?: string
  subCategoryId?: string
  categoryId: string
  sub_category_packages?:string
  categoryName: string
  cost: string
  hours: number
  date?: string
  time?: string
  quantity: number
}


