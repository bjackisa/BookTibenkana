'use client'

import { useState, useEffect } from 'react'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isAfter,
  startOfToday
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  selectedDate?: Date
  onDateSelect: (date: Date) => void
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = startOfToday()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const isDateSelectable = (date: Date) => {
    return isAfter(date, today) || isSameDay(date, today)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {dateRange.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const isSelectable = isDateSelectable(date)
          const isToday = isSameDay(date, today)

          return (
            <button
              key={index}
              type="button"
              onClick={() => isSelectable && onDateSelect(date)}
              disabled={!isSelectable}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${!isCurrentMonth 
                  ? 'text-gray-400' 
                  : isSelected
                    ? 'bg-blue-600 text-white'
                    : isToday
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : isSelectable
                        ? 'hover:bg-gray-100 text-gray-900'
                        : 'text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {format(date, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}