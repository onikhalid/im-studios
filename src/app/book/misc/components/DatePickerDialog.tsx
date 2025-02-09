"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const AVAILABLE_TIMES = ["9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm"]

interface DatePickerDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (date: Date, time: string) => void
    selectedDate?: Date
    selectedTime?: string
    error?: string
}

export function DatePickerDialog({
    open,
    onOpenChange,
    onSelect,
    selectedDate,
    selectedTime,
    error,
}: DatePickerDialogProps) {
    const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)
    const [time, setTime] = useState<string | undefined>(selectedTime)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#141414] border-gray-800 p-6 max-w-4xl text-white">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-normal">Select preferred date & time</h2>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onOpenChange(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-6  lg:grid grid-cols-[1fr,0.75fr] gap-x-10 lg:divide-x divide-[#373737]">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={handlePreviousMonth} className="rounded-full">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleNextMonth} className="rounded-full">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 items-center justify-center gap-3 text-center text-sm">
                            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                                <div key={day} className=" text-gray-500 w-10 h-[1lh]">
                                    {day}
                                </div>
                            ))}
                            {previousMonthDays.map((_, index) => (
                                <div key={`prev-${index}`} className="p-2" />
                            ))}
                            {days.map((day) => {
                                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                                const isSelected = date?.toDateString() === currentDate.toDateString()
                                const isPast = currentDate < new Date()

                                return (
                                    <Button
                                        key={day}
                                        type="button"
                                        variant="unstyled"
                                        className={cn(
                                            "rounded-xl text-white w-10 h-10 bg-[#373737] justify-self-center border border-transparent hover:border-white",
                                            isPast && "opacity-50 !cursor-not-allowed bg-[#37373794]",
                                            isSelected && "bg-white text-[#373737]"
                                        )}
                                        // className={`rounded-lg ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={isPast}
                                        onClick={() => setDate(currentDate)}
                                    >
                                        {day}
                                    </Button>
                                )
                            })}
                        </div>

                        <Button
                            className="w-max mt-12 px-8 text-sm"
                            type="button"
                            variant="reverse_cta"
                            onClick={() => {
                                if (date && time) {
                                    onSelect(date, time)
                                    onOpenChange(false)
                                }
                            }}
                            disabled={!date || !time}
                        >
                            Done
                        </Button>
                    </div>

                    {date && (
                        <section className="pl-10">
                            <div>
                                <h3 className="text-lg font-medium mb-3">{format(date, "EEEE, MMM dd yyyy")}</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {AVAILABLE_TIMES.map((t) => (
                                        <Button
                                            key={t}
                                            type="button"
                                            variant="unstyled"
                                            onClick={() => setTime(t)}
                                            className={cn(
                                                "w-full justify-center text-center h-12 rounded-xl border border-[#484848] font-light text-sm hover:bg-white/30",
                                                time === t && "!bg-white hover:bg-white border-white text-black"

                                            )}
                                        >
                                            {t}
                                        </Button>
                                    ))}
                                </div>
                            </div>


                        </section>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

