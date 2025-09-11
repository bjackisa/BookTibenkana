'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CheckCircle, Calendar, Clock, Users, MapPin, Globe, Mail, Phone, User } from 'lucide-react'
import { format } from 'date-fns'

interface BookingData {
  id: string
  service: string
  groupSize: number
  meetingType: string
  location?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  status: string
  createdAt: string
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bookingData = searchParams.get('data')
    if (bookingData) {
      try {
        const parsedBooking = JSON.parse(decodeURIComponent(bookingData))
        setBooking(parsedBooking)
      } catch (error) {
        console.error('Failed to parse booking data:', error)
      }
    }
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your booking information.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Book New Appointment
          </button>
        </div>
      </div>
    )
  }

  const formattedDate = format(new Date(booking.date), 'EEEE, MMMM d, yyyy')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500" size={64} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-gray-600">
            Your booking has been successfully scheduled
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Booking Details
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">ID</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Booking ID</span>
                <p className="font-medium">{booking.id}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-blue-600" size={16} />
              </div>
              <div>
                <span className="text-gray-500 text-sm">Service</span>
                <p className="font-medium">{booking.service}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="text-blue-600" size={16} />
              </div>
              <div>
                <span className="text-gray-500 text-sm">Date & Time</span>
                <p className="font-medium">{formattedDate} at {booking.time}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Users className="text-blue-600" size={16} />
              </div>
              <div>
                <span className="text-gray-500 text-sm">Attendees</span>
                <p className="font-medium">{booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                {booking.meetingType === 'online' ? (
                  <Globe className="text-blue-600" size={16} />
                ) : (
                  <MapPin className="text-blue-600" size={16} />
                )}
              </div>
              <div>
                <span className="text-gray-500 text-sm">Meeting Type</span>
                <p className="font-medium">
                  {booking.meetingType === 'online' ? 'Online Meeting' : `In-Person at ${booking.location}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid gap-3">
            <div className="flex items-center">
              <User className="text-gray-400 mr-3" size={16} />
              <span className="font-medium">{booking.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-gray-400 mr-3" size={16} />
              <span>{booking.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-gray-400 mr-3" size={16} />
              <span>{booking.phone}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            What's Next?
          </h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center">
              <CheckCircle className="text-blue-500 mr-2" size={16} />
              You will receive a confirmation email shortly
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-blue-500 mr-2" size={16} />
              Add this appointment to your calendar
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-blue-500 mr-2" size={16} />
              We'll send you a reminder 24 hours before your appointment
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another Appointment
          </button>
          <button
            onClick={() => window.print()}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}