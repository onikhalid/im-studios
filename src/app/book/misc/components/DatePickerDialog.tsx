"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const AVAILABLE_TIMES = ["9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm"]

interface DatePickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (date: Date, time: string) => void
  selectedDate?: Date
  selectedTime?: string
}

export function DatePickerDialog({ open, onOpenChange, onSelect, selectedDate, selectedTime }: DatePickerDialogProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [time, setTime] = useState<string | undefined>(selectedTime)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-gray-800">
        <DialogHeader>
          <DialogTitle>Select preferred date & time</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-gray-800" />
          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_TIMES.map((t) => (
              <Button key={t} variant={time === t ? "default" : "outline"} onClick={() => setTime(t)}>
                {t}
              </Button>
            ))}
          </div>
          <Button
            className="w-full"
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
      </DialogContent>
    </Dialog>
  )
}

