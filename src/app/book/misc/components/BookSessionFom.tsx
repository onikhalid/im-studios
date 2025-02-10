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
// import { Badge } from "@/components/ui/badge"
import { bookingFormSchema, type BookingFormValues, type SelectedService } from "../lib/schema"
import { type Categories2, type Category, useAppInfo } from "@/contexts/info"
import { DatePickerDialog } from "./DatePickerDialog"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { useMakeBooking } from "../api/postMakeBooking"
import Spinner from "@/components/ui/spinner"
import { useRouter, useSearchParams } from "next/navigation"
// import { ServiceSelector } from "./ServiceSelector"

export function BookingForm() {
    const { appInfo } = useAppInfo()
    const router = useRouter()
    const searchParams = useSearchParams()
    const serviceId = searchParams.get("service")


    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(serviceId)
    const [datePickerService, setDatePickerService] = useState<string | null>(null)
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            bookings: [],
        },
    })
    const {
        formState: { errors },
        watch,
    } = form
    console.log(errors)
    console.log(watch(), "CAASD")

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
                            : category.category_hours ?? 0,
                },
            ])
        }

        // Update form bookings
        updateFormBookings()
    }

    const handleDateSelect = (serviceId: string, date: Date, time: string) => {
        setSelectedServices((prev) =>
            prev.map((service) =>
                service.categoryId === serviceId
                    ? {
                        ...service,
                        date: format(date, "yyyy-MM-dd"),
                        time,
                    }
                    : service,
            ),
        )

        // Update form bookings field
        const updatedBookings = selectedServices
            .map((service) =>
                service.categoryId === serviceId
                    ? {
                        service_category: service.categoryId,
                        book_date: format(date, "yyyy-MM-dd"),
                        book_time: time,
                    }
                    : service.date && service.time
                        ? {
                            service_category: service.categoryId,
                            book_date: service.date,
                            book_time: service.time,
                        }
                        : null,
            )
            .filter((booking): booking is NonNullable<typeof booking> => booking !== null)

        form.setValue("bookings", updatedBookings, {
            shouldValidate: true,
            shouldDirty: true,
        })
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

    async function onSubmit(data: BookingFormValues) {
        if (selectedServices.some((s) => !s.date)) {
            alert("Please select a date for all selected services")
            return
        }

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
        makeBooking(payload, {
            onSuccess(data) {
                router.push(data.checkout_url)
            },
        })
    }

    return (
        <>
            <div className=" relative w-full mx-auto flex max-lg:flex-col items-center gap-12 gap-y-6 lg:h-screen overflow-y-hidden bg-[#0E0E0E] ">
                <section className="pt-12 leading-tight lg:max-h-full lg:w-1/2 overflow-hidden lg:sticky top-0 p-6">
                    <h1 className="text-[7rem] lg:text-[15rem] leading-none font-bebas text-[#FFFFFF21]">
                        BOOK
                        <span className="md:hidden ml-2">A</span>
                    </h1>
                    <h1 className="text-[7rem] lg:text-[10rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
                        <span className="mx-4 max-md:hidden">A</span>
                        SESSION
                    </h1>
                </section>

                <section className="lg:max-h-full w-full lg:w-1/2 overflow-y-scroll p-4 md:p-6 lg:pt-20 xl:pr-0">
                    <div className="space-y-8 bg-[#141414] p-6 md:p-8 xl:p-12 rounded-l-2xl max-w-2xl">
                        <p className="text-lg md:text-xl text-gray-400">Provide details below to book a session today</p>

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
                                                    <Input placeholder="Enter first name" {...field} className="border-[#484848]" />
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
                                                    <Input placeholder="Enter last name" {...field} className="border-[#484848]" />
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
                                                <Input placeholder="Enter email address" type="email" {...field} className="border-[#484848]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <FormLabel>Which of our services would you like to book?</FormLabel>
                                    <Select onValueChange={handleServiceSelect} value={selectedServiceId || undefined}>
                                        <SelectTrigger className="border-[#484848] h-14 text-white">
                                            <SelectValue placeholder="Select service" className="text-white" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#161616] text-white border border-[#484848] rounded-xl">
                                            {appInfo?.services?.map((service) => (
                                                <SelectItem key={service.id} value={service.id}>
                                                    {service.service_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {selectedServiceId && (
                                        <div className="flex flex-col bg-[#161616] rounded-xl border border-[#484848] divide-y divide-[#373737] px-2">
                                            {appInfo?.services
                                                ?.find((s) => s.id === selectedServiceId)
                                                ?.categories.map((category) => {
                                                    const isSelected = selectedServices.some((s) => s.categoryId === category.id)
                                                    return (
                                                        <button
                                                            key={category.id}
                                                            type="button"
                                                            // variant={isSelected ? "default" : "outline"}
                                                            className="flex items-start justify-between h-auto p-4"
                                                            onClick={() => handleCategorySelect(category)}
                                                        >
                                                            <div className="flex flex-col items-start text-left text-sm text-[#D8D8DF]">
                                                                <p>{convertKebabAndSnakeToTitleCase(category.category_name)}</p>
                                                                <p className="text-white font-semibold">£{category.category_cost}</p>
                                                            </div>

                                                            <div className="flex items-center justify-center h-5 w-5 border border-white rounded-full">
                                                                {isSelected && <span className="h-3 w-3 bg-white rounded-full"></span>}
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                        </div>
                                    )}
                                </div>

                                {selectedServices.length > 0 && (
                                    <div className="space-y-2 max-md:divide-y">
                                        {
                                            selectedServices.map((service) => (
                                                <div key={service.categoryId} className="flex max-md:flex-col items-start md:items-center gap-4 p-3 50 rounded-lg">
                                                    <div className="flex items-center gap-4">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="bg-[#FFFFFF33] rounded-full"
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
                                                                    end_time: "",
                                                                })
                                                            }
                                                        >
                                                            <X className="h-4 w-4 text-white" />
                                                        </Button>
                                                        <div className="flex-1 flex items-center">
                                                            <h4 className="font-medium text-white">
                                                                {convertKebabAndSnakeToTitleCase(service.categoryName)}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Button
                                                            variant="outline"
                                                            type="button"
                                                            size="lg"
                                                            className="w-[150px] text-sm !px-4 text-left font-normal"
                                                            onClick={() => setDatePickerService(service.categoryId)}
                                                        >
                                                            {service.date ? format(new Date(service.date), "MMM dd") : "Pick a date"}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                        <p className="text-[0.9rem] text-white">
                                                            Cost:
                                                            <span className="font-semibold">£{service.cost}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-max !text-sm"
                                    variant="cta"
                                    size="cta"
                                    disabled={!form.formState.isValid || isPending}
                                >
                                    Proceed - £{totalCost.toFixed(2)}
                                    {isPending && <Spinner size={18} />}
                                </Button>

                                {form.formState.errors.bookings?.message && (
                                    <p className="text-[0.8rem] font-medium bg-destructive/30 text-destructive px-3 py-1.5 rounded-md">{form.formState.errors.bookings.message}</p>
                                )}
                                {selectedServices.length > 0 && (
                                    <p className="flex text-left text-[0.8rem] text-emerald-500">Payment validates booking</p>
                                )}
                            </form>
                        </Form>
                    </div>
                </section>
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
                        datePickerService && selectedServices.find((s) => s.categoryId === datePickerService)?.date
                            ?
                            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                            new Date(selectedServices.find((s) => s.categoryId === datePickerService)?.date!)
                            : undefined
                    }
                    selectedTime={selectedServices.find((s) => s.categoryId === datePickerService)?.time}
                    error={form.formState.errors.bookings?.message}
                />
            )}
        </>
    )
}

