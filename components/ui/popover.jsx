"use client"
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverContent = React.forwardRef(function PopoverC({ className="", align="start", sideOffset=4, ...props }, ref){
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={"z-50 rounded-xl border bg-popover p-2 text-popover-foreground shadow-md outline-none "+className}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
