"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { CalendarIcon, X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { bookingFormSchema, type BookingFormValues, type SelectedService } from "../lib/schema"
import { type Categories2, type Category, useAppInfo } from "@/contexts/info"
import { DatePickerDialog } from "./DatePickerDialog"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { useMakeBooking } from "../api/postMakeBooking"
import Spinner from "@/components/ui/spinner"
// import { ServiceSelector } from "./ServiceSelector"

export function BookingForm() {
    const { appInfo } = useAppInfo()
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
    const [datePickerService, setDatePickerService] = useState<string | null>(null)
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            bookings: [],
        },
    })
    const { formState: { errors } } = form
    console.log(errors)

    const handleServiceSelect = (serviceId: string) => {
        setSelectedServiceId(serviceId)
    }

    const handleCategorySelect = (category: Category | Categories2) => {
        const service = appInfo?.services?.find((s) => s.id === selectedServiceId)
        if (!service) return

        const exists = selectedServices.some((s) => s.categoryId === category.id)

        if (exists) {
            setSelectedServices((prev) => prev.filter((s) => s.categoryId !== category.id))
        } else {
            setSelectedServices((prev) => [
                ...prev,
                {
                    serviceId: service.id,
                    serviceName: service.service_name,
                    categoryId: category.id,
                    categoryName: category.category_name,
                    cost: category.category_cost,
                    hours:
                        typeof category.category_hours === "string"
                            ? Number.parseFloat(category.category_hours)
                            : category.category_hours,
                },
            ])
        }

        // Update form bookings
        updateFormBookings()
    }

    const handleDateSelect = (serviceId: string, date: Date, time: string) => {
        setSelectedServices((prev) =>
            prev.map((service) =>
                service.categoryId === serviceId ? { ...service, date: format(new Date(date) || new Date(), "yyyy-MM-dd"), time } : service,
            ),
        )
        updateFormBookings()
    }

    const updateFormBookings = () => {
        const bookings = selectedServices
            .filter((service) => service.date)
            .map((service) => ({
                service_category: service.categoryId,
                book_date: service.date!,
            }))
        form.setValue("bookings", bookings)
    }

    const totalCost = selectedServices.reduce((acc, service) => acc + Number.parseFloat(service.cost), 0)


    const { mutate: makeBooking, isPending } = useMakeBooking()

    // async function onSubmit(data: BookingFormValues) {
    //   const payload = {
    //     ...data,
    //     bookings: selectedServices
    //       .filter((service) => service.date)
    //       .map((service) => ({
    //         service_category: service.categoryId,
    //         book_date: service.date,
    //       })),
    //   }
    //   makeBooking(payload)
    // }
    async function onSubmit(data: BookingFormValues) {
        const payload = {
            ...data,
            bookings: selectedServices
                .filter((service) => service.date)
                .map((service) => ({
                    service_category: service.categoryId,
                    book_date: format(new Date(service.date || new Date()), "yyyy-MM-dd"),
                })),
        }
        console.log(payload)
        makeBooking(payload)

    }

    return (
        <div className="bg-[#0E0E0E]  ">
            <div className="w-full mx-auto grid lg:grid-cols-2 items-center gap-12 p-6 xl:p-20 xl:pr-0 min-h-screen">
                <div className="pt-12 leading-tight">
                    <h1 className="text-[7rem] xl:text-[15rem] leading-none font-bebas text-[#FFFFFF21]">BOOK

                        <span className="md:hidden ml-2">A</span>
                    </h1>
                    <h1 className="text-[7rem] xl:text-[10rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
                        <span className="ml-2 max-md:hidden">A
                        </span>
                        SESSION</h1>
                </div>

                <div className="space-y-8 bg-[#141414] md:p-8 xl:p-12 rounded-l-2xl">
                    <p className="text-xl text-gray-400">Provide details below to book a session today</p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4 gap-y-6">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter first name" {...field} className="border-gray-700" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter last name" {...field} className="border-gray-700" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Active email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter email address"
                                                type="email"
                                                {...field}
                                                className="border-gray-700"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter phone number"
                                                type="tel"
                                                {...field}
                                                className="border-gray-700"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <FormLabel>Which of our services would you like to book for?</FormLabel>
                                <Select onValueChange={handleServiceSelect} value={selectedServiceId || undefined}>
                                    <SelectTrigger className="border-gray-700 h-12">
                                        <SelectValue placeholder="Select service" className="text-white" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {appInfo?.services?.map((service) => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.service_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {selectedServiceId && (
                                    <div className="flex flex-col gap-4 bg-[#161616] p-2 rounded-xl border border-[#484848] divide-y">
                                        {appInfo?.services
                                            ?.find((s) => s.id === selectedServiceId)
                                            ?.categories.map((category) => {
                                                const isSelected = selectedServices.some((s) => s.categoryId === category.id)
                                                return (
                                                    <button
                                                        key={category.id}
                                                        type="button"
                                                        // variant={isSelected ? "default" : "outline"}
                                                        className="h-auto"
                                                        onClick={() => handleCategorySelect(category)}
                                                    >
                                                        <div className="flex flex-col items-start text-left text-[#D8D8DF]">
                                                            <span>{convertKebabAndSnakeToTitleCase(category.category_name)}</span>
                                                            <p className="text-xs text-muted-foreground">
                                                                {category.category_description}

                                                                <span className="block">
                                                                    £{category.category_cost}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </button>
                                                )
                                            })}
                                    </div>
                                )}
                            </div>

                            {selectedServices.length > 0 && (
                                <div className="space-y-2">
                                    {selectedServices.map((service) => (
                                        <div key={service.categoryId} className="flex items-center gap-4 p-3 50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium">{service.categoryName}</h4>
                                                <p className="text-sm text-gray-400">Cost: £{service.cost}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-[140px] pl-3 text-left font-normal"
                                                onClick={() => setDatePickerService(service.categoryId)}
                                            >
                                                {service.date ? format(new Date(service.date), "MMM dd") : "Pick a date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleCategorySelect({
                                                        id: service.categoryId,
                                                        category_name: service.categoryName,
                                                        category_cost: service.cost,
                                                        category_hours: service.hours ?? 0,
                                                        created_at: "",
                                                        updated_at: "",
                                                        category_description: "",
                                                        sub_category_name: "",
                                                        sub_category_cost: "",
                                                        service: "",
                                                        start_time: "",
                                                        end_time: ""

                                                    })
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}


                            <Button
                                type="submit"
                                className="w-full"
                                disabled={selectedServices.length === 0 || selectedServices.some((s) => !s.date)}
                            >
                                Proceed - £{totalCost.toFixed(2)}
                                {
                                    isPending && <Spinner size={18} />
                                }
                            </Button>

                            {selectedServices.length > 0 && (
                                <p className="text-center text-sm text-emerald-500">Payment validates booking</p>
                            )}
                        </form>
                    </Form>
                </div>
            </div>

            {datePickerService && (
                <DatePickerDialog
                    open={!!datePickerService}
                    onOpenChange={(open) => !open && setDatePickerService(null)}
                    onSelect={(date, time) => {
                        if (datePickerService) {
                            handleDateSelect(datePickerService, date, time)
                        }
                    }}
                    selectedDate={
                        datePickerService
                            ? new Date(selectedServices.find((s) => s.categoryId === datePickerService)?.date || "")
                            : undefined
                    }
                    selectedTime={selectedServices.find((s) => s.categoryId === datePickerService)?.time}
                />
            )}
        </div>
    )
}

