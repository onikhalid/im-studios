"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, InfoIcon, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import Spinner from "@/components/ui/spinner"
import { type Category, type Service, useAppInfo } from "@/contexts/info"
import { bookingFormSchema, type BookingFormValues, type SelectedService } from "../lib/schema"
import { DatePickerDialog } from "./DatePickerDialog"
import { useMakeBooking } from "../api/postMakeBooking"
import { useRouter, useSearchParams } from "next/navigation"
import useErrorModalState from "@/hooks/useErrorModalState"
import { ErrorDialog, InfoToolTip } from "@/components/ui"

type SelectebleCatgory = Category & {
  is_sub_category?: boolean
  sub_category_id?: string
}

export function BookingForm() {
  const { appInfo } = useAppInfo()
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("service")

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(serviceId)
  const [datePickerService, setDatePickerService] = useState<string | null>(null)
  const [selectedCategoriesAndSubCategories, setSelectedCategoriesAndSubCategories] = useState<SelectedService[]>([])

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      bookings: [],
    },
  })
  // const { formState, watch, register } = form

  const handleCategorySelect = (category: SelectebleCatgory) => {
    const service = selecteableServices?.find((s) => s.id === selectedServiceId)
    if (!service) return

    const exists = selectedCategoriesAndSubCategories.some((s) => {
      if (category.is_sub_category) {
        return s.subCategoryId === category.sub_category_id
      } else {
        return s.categoryId === category.id
      }
    })

    if (exists) {
      setSelectedCategoriesAndSubCategories((prev) =>
        prev.filter((s) => {
          if (category.is_sub_category) {
            return s.subCategoryId !== category.sub_category_id
          } else {
            return s.categoryId !== category.id
          }
        }),
      )
    } else {
      setSelectedCategoriesAndSubCategories((prev) => [
        ...prev,
        {
          serviceId: service.id,
          serviceName: service.service_name,
          categoryId: category.id,
          subCategoryId: category.sub_category_id,
          categoryName: category.category_name,
          subCategoryName: category.category_name || "",
          cost: category.category_cost.toString(),
          hours:
            typeof category.category_hours === "string"
              ? Number.parseFloat(category.category_hours)
              : (category.category_hours ?? 0),
          quantity: 1,
        },
      ])
    }

    updateFormBookings()
  }

  type SelectableService = Omit<Service, "categories"> & {
    categories: SelectebleCatgory[]
  }
  const selecteableServices: SelectableService[] = useMemo(() => {
    const new_services: SelectableService[] = []

    appInfo?.services.forEach((service) => {
      if (
        service.categories.some(
          (category) => category.sub_category_packages && category.sub_category_packages.length > 0,
        )
      ) {
        const new_categories: SelectebleCatgory[] = []

        service.categories.forEach((category) => {
          category.sub_category_packages.forEach((subPackage) => {
            new_categories.push({
              id: category.id,
              category_name: `${category.category_name} - ${subPackage.package_name}`,
              category_description: subPackage.package_description,
              category_cost: subPackage.package_cost,
              category_hours: null,
              start_time: null,
              end_time: null,
              is_sub_category: true,
              sub_category_id: subPackage.id,
              sub_category_packages: [],
            })
          })
        })
        new_services.push({
          ...service,
          categories: [
            ...new_categories,
            ...service.categories.filter((category) => !category.sub_category_packages?.length),
          ],
        })
      } else {
        new_services.push({
          ...service,
          categories: service.categories.map((category) => ({
            ...category,
            is_sub_category: false,
            sub_category_id: "0",
          })),
        })
      }
    })

    return new_services
  }, [appInfo])

  const filteredSelecteableServices = useMemo(() => {
    if (!selectedServiceId) return {} as SelectableService

    // Find the currently se-lected service
    const selectedService = selecteableServices.find((service) => service.id === selectedServiceId)

    if (!selectedService) return {} as SelectableService

    // Return a clean copy to ensure we don't have any reference issues
    return {
      ...selectedService,
      categories: selectedService.categories.map((category) => ({ ...category })),
    }
  }, [selectedServiceId, selecteableServices])

  const handleDateSelect = (serviceId: string, date: Date) => {
    setSelectedCategoriesAndSubCategories((prev) =>
      prev.map((service) =>
        service.categoryId === serviceId
          ? {
              ...service,
              date: format(date, "yyyy-MM-dd"),
            }
          : service,
      ),
    )

    const updatedBookings = selectedCategoriesAndSubCategories.map((service) => ({
      service_category: service.categoryId,
      sub_category_package: service.sub_category_packages,
      book_date: service.categoryId === serviceId ? format(date, "yyyy-MM-dd") : service.date || "",
      quantity: service.quantity,
    }))

    form.setValue("bookings", updatedBookings, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    // Update the selected categories state
    setSelectedCategoriesAndSubCategories((prev) =>
      prev.map((service) =>
        service.categoryId === serviceId
          ? {
              ...service,
              quantity,
            }
          : service,
      ),
    )

    // Update the form bookings with all current selections
    const updatedBookings = selectedCategoriesAndSubCategories.map((service) => ({
      service_category: service.categoryId,
      sub_category_package: service.subCategoryId,
      book_date: service.date || "",
      quantity: service.categoryId === serviceId ? quantity : service.quantity || 1,
    }))

    form.setValue("bookings", updatedBookings, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const updateFormBookings = () => {
    const bookings = selectedCategoriesAndSubCategories
      .filter((service) => service.date)
      .map((service) => ({
        service_category: service.categoryId,
        sub_category_package: service.subCategoryId,
        book_date: service.date!,
        quantity: service.quantity || 1,
      }))
    form.setValue("bookings", bookings, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const totalCost = selectedCategoriesAndSubCategories.reduce(
    (acc, service) => acc + Number.parseFloat(service.cost) * (service.quantity || 1),
    0,
  )

  const { mutate: makeBooking, isPending } = useMakeBooking()
  const { isErrorModalOpen, closeErrorModal, errorModalMessage, openErrorModalWithMessage } = useErrorModalState()
  async function onSubmit(data: BookingFormValues) {
    if (selectedCategoriesAndSubCategories.some((s) => !s.date)) {
      alert("Please select a date for all selected services")
      return
    }

    const payload = {
      ...data,
      bookings: selectedCategoriesAndSubCategories.map((service) => ({
        service_category: service.categoryId,
        sub_category_package: service.subCategoryId !== "0" ? service.subCategoryId : null,
        book_date: service.date!,
        quantity: service.quantity || 1,
      })),
    }
    console.log(payload)
    makeBooking(payload, {
      onSuccess(data) {
        router.push(data.checkout_url)
      },
      onError(error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        openErrorModalWithMessage((error as any)?.response?.data?.message || "Something went wrong")
      },
    })
  }

  // const logSelectedCategories = useCallback(() => {
  //     console.log("Current selected service:", selectedServiceId)
  //     console.log("Selected categories:", selectedCategoriesAndSubCategories)
  //     console.log("Filtered categories:", filteredSelecteableServices?.categories)
  // }, [selectedServiceId, selectedCategoriesAndSubCategories, filteredSelecteableServices])

  // useEffect(() => {
  //     logSelectedCategories()
  // }, [logSelectedCategories])

  return (
    <>
      <div className="relative w-full mx-auto flex max-lg:flex-col items-center gap-12 gap-y-6 lg:h-screen lg:overflow-y-hidden bg-[#0E0E0E] min-h-screen">
        <section className="pt-12 leading-tight lg:max-h-full lg:w-[40%] 2xl:w-1/2 lg:overflow-hidden lg:sticky top-0 p-6">
          <h1 className="text-[7rem] lg:text-[12.5rem] xl:text-[15rem] leading-none font-bebas text-[#FFFFFF21]">
            BOOK
            <span className="md:hidden ml-2">A</span>
          </h1>
          <h1 className="text-[7rem] lg:text-[8.25rem] xl:text-[10rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
            <span className="mx-4 max-md:hidden">A</span>
            SESSION
          </h1>
        </section>

        <section className="lg:max-h-full w-full lg:w-[60%] 2xl:w-1/2 overflow-y-scroll p-1 md:p-6 lg:pt-20 xl:pr-0">
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
                  <Select
                    onValueChange={(serviceId) => setSelectedServiceId(serviceId)}
                    value={selectedServiceId || undefined}
                  >
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

                  {selectedServiceId && filteredSelecteableServices.categories && (
                    <div className="flex flex-col bg-[#161616] rounded-xl border border-[#484848] divide-y divide-[#373737] px-2">
                      {filteredSelecteableServices.categories.map((category, index) => {
                        const isSelected = selectedCategoriesAndSubCategories.some((s) =>
                          category.is_sub_category
                            ? s.subCategoryId === category.sub_category_id
                            : s.categoryId === category.id,
                        )

                        return (
                          <div key={category.id + index}>
                            <button
                              type="button"
                              className="flex items-start justify-between h-auto p-4 w-full"
                              onClick={() => handleCategorySelect(category)}
                            >
                              <div className="flex flex-col items-start text-left text-[0.785rem] sm:text-sm text-[#D8D8DF]">
                                <p className="">
                                  {convertKebabAndSnakeToTitleCase(category.category_name)}
                                  <span className="inline-flex items-center justify-center h-[1lh] ml-1 mt-0.5">
                                    <InfoToolTip
                                      content={category.category_description}
                                      contentClass="text-xs"
                                      align="end"
                                    >
                                      <InfoIcon className="h-4 w-4 text-white" />
                                    </InfoToolTip>
                                  </span>
                                </p>
                                <span className="italic text-[0.67rem] text-white/60">
                                  {category.category_description}
                                </span>
                                <p className="text-white font-semibold">£{category.category_cost}</p>
                              </div>

                              <div className="flex shrink-0 items-center justify-center h-5 w-5 border border-white rounded-full">
                                {isSelected && <span className="h-3 w-3 bg-white rounded-full"></span>}
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {selectedCategoriesAndSubCategories.length == 0 && (
                  <p className="text-[0.8rem] font-medium bg-destructive/30 text-destructive px-3 py-1.5 rounded-md">
                    Select at least one service to proceed
                  </p>
                )}
                {selectedCategoriesAndSubCategories.length > 0 && (
                  <div className="space-y-2 max-md:divide-y">
                    {selectedCategoriesAndSubCategories.map((service, index) => (
                      <div
                        key={index}
                        className="flex max-md:flex-col items-start md:items-center gap-4 p-3 50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Button
                            size="icon"
                            type="button"
                            variant="ghost"
                            className="bg-[#FFFFFF33] rounded-full h-6 w-6 text-white hover:text-black shrink-0"
                            onClick={() =>
                              handleCategorySelect({
                                id: service.categoryId,
                                category_name: service.categoryName,
                                category_cost: Number.parseFloat(service.cost),
                                category_hours: service.hours ?? 0,
                                category_description: "",
                                is_sub_category: !!service.subCategoryId,
                                sub_category_id: service.subCategoryId,
                                start_time: null,
                                end_time: null,
                                sub_category_packages: [],
                              })
                            }
                          >
                            <X className="h-4 w-4 text-inherit" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={service.quantity || 1}
                            onChange={(e) => handleQuantityChange(service.categoryId, Number(e.target.value))}
                            className="min-w-16 shrink max-w-24 h-10 !text-xs px-3 py-1 text-white bg-[#000000] border-[#484848] rounded-lg !appearance-none"
                          />
                          <div className="flex-1 flex items-center">
                            <h4 className="font-medium text-white text-[0.8rem] md:text-[0.84rem]">
                              {convertKebabAndSnakeToTitleCase(service.categoryName)}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto shrink-0">
                          <Button
                            variant="outline"
                            type="button"
                            className="w-[100px] text-[0.7rem] !h-8 sm:!px-2.5 text-left font-normal "
                            onClick={() => setDatePickerService(service.categoryId)}
                          >
                            {service.date ? format(new Date(service.date), "MMM dd") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                          <p className="text-[0.85rem] text-white shrink-0">
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
                  disabled={selectedCategoriesAndSubCategories.length === 0 || isPending}
                >
                  Proceed - £{totalCost.toFixed(2)}
                  {isPending && <Spinner size={18} />}
                </Button>

                {selectedCategoriesAndSubCategories.length > 0 && (
                  <p className="flex text-left text-[0.7rem] md:text-[0.8rem] text-emerald-500">Payment validates booking</p>
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
          onSelect={(date) => {
            if (datePickerService) {
              handleDateSelect(datePickerService, date)
            }
          }}
          selectedDate={
            datePickerService &&
            selectedCategoriesAndSubCategories.find((s) => s.categoryId === datePickerService)?.date
              ? new Date(selectedCategoriesAndSubCategories.find((s) => s.categoryId === datePickerService)!.date!)
              : undefined
          }
          error={form.formState.errors.bookings?.message}
        />
      )}

      <ErrorDialog
        title="SOMETHING WENT WRONG"
        description={errorModalMessage}
        isErrorDialogOpen={isErrorModalOpen}
        closeErrorDialog={closeErrorModal}
      />
    </>
  )
}

