'use client'

import React from 'react'
import { Clock } from 'lucide-react'

interface TimeSlotPickerProps {
  selectedTime?: string
  onTimeSelect: (time: string) => void
  availableSlots?: string[]
}

export default function TimeSlotPicker({ 
  selectedTime, 
  onTimeSelect, 
  availableSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] 
}: TimeSlotPickerProps) {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center">
        <Clock className="mr-2" size={20} />
        Available Times
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableSlots.map((time) => (
          <button
            key={time}
            type="button"
            className={`
              p-3 border-2 rounded-lg text-center hover:border-blue-500 transition-colors
              ${selectedTime === time
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }
            `}
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}