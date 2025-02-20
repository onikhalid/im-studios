"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import Spinner from "@/components/ui/spinner"
import { type Category, Service, useAppInfo } from "@/contexts/info"
import { bookingFormSchema, type BookingFormValues, type SelectedService } from "../lib/schema"
import { DatePickerDialog } from "./DatePickerDialog"
import { useMakeBooking } from "../api/postMakeBooking"
import { useRouter, useSearchParams } from "next/navigation"

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

    const handleCategorySelect = (category: Category) => {
        const service = selecteableServices?.find((s) => s.id === selectedServiceId)
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
                    subCategoryName: category.category_name || "",
                    cost: category.category_cost.toString(),
                    hours:
                        typeof category.category_hours === "string"
                            ? Number.parseFloat(category.category_hours)
                            : (category.category_hours ?? 0),
                },
            ])
        }

        updateFormBookings()
    }

    const selecteableServices = useMemo(() => {
        const new_services: Service[] = []

        appInfo?.services.forEach(service => {
            if (service.categories.some(category => category.sub_category_packages && category.sub_category_packages.length > 0)) {
                const new_categories: Category[] = []

                service.categories.forEach(category => {
                    category.sub_category_packages.forEach(subPackage => {
                        new_categories.push({
                            id: subPackage.id,
                            category_name: `${category.category_name} - ${subPackage.package_name}`,
                            category_description: subPackage.package_description,
                            category_cost: subPackage.package_cost,
                            category_hours: null,
                            start_time: null,
                            end_time: null,
                            sub_category_packages: []
                        })
                    })

                })
                new_services.push({
                    ...service,
                    categories: [...new_categories, ...service.categories.filter(category => !category.sub_category_packages?.length)]
                })
            }
            else new_services.push(service)
        })

        return new_services
    }, [appInfo])


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubPackageSelect = (categoryId: string, subPackage: any) => {
        setSelectedServices((prev) =>
            prev.map((service) =>
                service.categoryId === categoryId
                    ? {
                        ...service,
                        subPackage: {
                            id: subPackage.id,
                            name: subPackage.package_name,
                            description: subPackage.package_description,
                            cost: subPackage.package_cost,
                        },
                        cost: subPackage.package_cost.toString(),
                    }
                    : service,
            ),
        )

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

        const updatedBookings = selectedServices.map((service) => ({
            service_category: service.categoryId,
            book_date: service.categoryId === serviceId ? format(date, "yyyy-MM-dd") : service.date || "",
            book_time: service.categoryId === serviceId ? time : service.time || "",
        }))

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
                book_time: service.time!,
            }))
        form.setValue("bookings", bookings)
    }

    const totalCost = selectedServices.reduce((acc, service) => acc + Number.parseFloat(service.cost), 0)

    const { mutate: makeBooking, isPending } = useMakeBooking()

    async function onSubmit(data: BookingFormValues) {
        if (selectedServices.some((s) => !s.date || !s.time)) {
            alert("Please select a date and time for all selected services")
            return
        }

        const payload = {
            ...data,
            bookings: selectedServices.map((service) => ({
                service_category: service.categoryId,
                book_date: service.date!,
                book_time: service.time!,
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
            <div className="relative w-full mx-auto flex max-lg:flex-col items-center gap-12 gap-y-6 lg:h-screen overflow-y-hidden bg-[#0E0E0E]">
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

                <section className="lg:max-h-full w-full lg:w-1/2 overflow-y-scroll p-1 md:p-6 lg:pt-20 xl:pr-0">
                    <div className="space-y-8 bg-[#141414] p-4 sm:p-8 xl:p-12 rounded-l-2xl max-w-2xl">
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
                                            {selecteableServices?.map((service) => (
                                                <SelectItem key={service.id} value={service.id}>
                                                    {service.service_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {selectedServiceId && (
                                        <div className="flex flex-col bg-[#161616] rounded-xl border border-[#484848] divide-y divide-[#373737] px-2">
                                            {selecteableServices
                                                ?.find((s) => s.id === selectedServiceId)
                                                ?.categories.map((category) => {
                                                    const isSelected = selectedServices.some((s) => s.categoryId === category.id)
                                                    return (
                                                        <div key={category.id}>
                                                            <button
                                                                type="button"
                                                                className="flex items-start justify-between h-auto p-4 w-full"
                                                                onClick={() => handleCategorySelect(category)}
                                                            >
                                                                <div className="flex flex-col items-start text-left text-[0.785rem] sm:text-sm text-[#D8D8DF]">
                                                                    <p>
                                                                        {convertKebabAndSnakeToTitleCase(category.category_name)}
                                                                    </p>
                                                                    <p className="text-white font-semibold">£{category.category_cost}
                                                                    </p>
                                                                </div>

                                                                <div className="flex shrink-0 items-center justify-center h-5 w-5 border border-white rounded-full">
                                                                    {isSelected && <span className="h-3 w-3 bg-white rounded-full"></span>}
                                                                </div>
                                                            </button>
                                                            {isSelected &&
                                                                category.sub_category_packages &&
                                                                category.sub_category_packages.length > 0 && (
                                                                    <div className="pl-4 pb-4">
                                                                        <p className="text-sm text-[#D8D8DF] mb-2">Select a package:</p>
                                                                        {category.sub_category_packages.map((subPackage) => (
                                                                            <button
                                                                                key={subPackage.id}
                                                                                type="button"
                                                                                className="flex items-center justify-between w-full p-2 text-sm text-[#D8D8DF] hover:bg-[#2A2A2A] rounded"
                                                                                onClick={() => handleSubPackageSelect(category.id, subPackage)}
                                                                            >
                                                                                <span>{subPackage.package_name}</span>
                                                                                <span>£{subPackage.package_cost}</span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    )}
                                </div>

                                {selectedServices.length > 0 && (
                                    <div className="space-y-2 max-md:divide-y">
                                        {selectedServices.map((service, index) => (
                                            <div
                                                key={index}
                                                className="flex max-md:flex-col items-start md:items-center gap-4 p-3 50 rounded-lg"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="bg-[#FFFFFF33] rounded-full max-sm:h-6 max-sm:w-6 w-7 h-7 text-white hover:text-black"
                                                        onClick={() =>
                                                            handleCategorySelect({
                                                                id: service.categoryId,
                                                                category_name: service.categoryName,
                                                                category_cost: Number.parseFloat(service.cost),
                                                                category_hours: service.hours ?? 0,
                                                                category_description: "",
                                                                start_time: "",
                                                                end_time: "",
                                                                sub_category_packages: []

                                                            })
                                                        }
                                                    >
                                                        <X className="h-4 w-4 text-inherit" />
                                                    </Button>
                                                    <div className="flex-1 flex items-center">
                                                        <h4 className="font-medium text-white text-sm md:text-[0.9rem]">
                                                            {convertKebabAndSnakeToTitleCase(service.categoryName)}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 ml-auto shrink-0">
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        className="w-[120px] text-[0.8rem] !h-8 sm:!h-9  sm:!px-4 text-left font-normal "
                                                        onClick={() => setDatePickerService(service.categoryId)}
                                                    >
                                                        {service.date ? format(new Date(service.date), "MMM dd") : "Pick a date"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                    <p className="text-[0.9rem] text-white shrink-0">
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
                                    disabled={!form.formState.isValid || selectedServices.length === 0 || isPending}
                                >
                                    Proceed - £{totalCost.toFixed(2)}
                                    {isPending && <Spinner size={18} />}
                                </Button>

                                {form.formState.errors.bookings?.message && (
                                    <p className="text-[0.8rem] font-medium bg-destructive/30 text-destructive px-3 py-1.5 rounded-md">
                                        {form.formState.errors.bookings.message}
                                    </p>
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
                            ? new Date(selectedServices.find((s) => s.categoryId === datePickerService)!.date!)
                            : undefined
                    }
                    selectedTime={selectedServices.find((s) => s.categoryId === datePickerService)?.time}
                    error={form.formState.errors.bookings?.message}
                />
            )}
        </>
    )
}

