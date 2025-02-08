"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SelectedService } from "../lib/schema"
import { Service } from "@/contexts/info"

interface ServiceSelectorProps {
  services: Service[]
  onServiceSelect: (service: SelectedService) => void
  selectedServices: SelectedService[]
}

export function ServiceSelector({ services, onServiceSelect, selectedServices }: ServiceSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedService ? selectedService.service_name : "Select service..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search services..." />
            <CommandList>
              <CommandEmpty>No service found.</CommandEmpty>
              <CommandGroup>
                {services.map((service) => (
                  <CommandItem
                    key={service.id}
                    onSelect={() => {
                      setSelectedService(service)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedService?.id === service.id ? "opacity-100" : "opacity-0")}
                    />
                    {service.service_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedService && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Select categories:</h4>
          <div className="grid gap-2">
            {selectedService.categories.map((category) => {
              const isSelected = selectedServices.some((s) => s.categoryId === category.id)
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className="justify-between h-auto py-4"
                  onClick={() => {
                    onServiceSelect({
                      serviceId: selectedService.id,
                      serviceName: selectedService.service_name,
                      categoryId: category.id,
                      categoryName: category.category_name,
                      cost: category.category_cost,
                      hours: typeof category.category_hours === 'number' ? category.category_hours : null,
                    })
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span>{category.category_name}</span>
                    <span className="text-sm text-muted-foreground">{category.category_description}</span>
                  </div>
                  <Badge variant={isSelected ? "secondary" : "outline"}>£{category.category_cost}</Badge>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

