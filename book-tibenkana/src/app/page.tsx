'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar as CalendarIcon, Clock, Users, MapPin, Globe } from 'lucide-react'
import { format } from 'date-fns'
import Calendar from '@/components/Calendar'
import TimeSlotPicker from '@/components/TimeSlotPicker'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    service: '',
    groupSize: 1,
    meetingType: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  })

  const services = [
    'Food & Beverage Product Formulation',
    'Process Engineering (Prototype → Stabilize → Scale-Up)',
    'Quality Management Setup (SOPs, PRPs, HACCP)',
    'UNBS Q-Mark Certification Support',
    'Export Readiness & Standards Compliance',
    'Branding, Packaging & Labeling Design',
    'Go-to-Market & Marketing Strategy',
    'Systems Thinking Facilitation & Leadership Workshops',
    'Entrepreneurship Mentorship (1:1 / Group)',
    'Training of Trainers (ToT) – Product Dev, QC, Standards',
    'Business Formalization & Compliance (URSB/URA/etc.)',
    'Grant/Proposal Writing & Fundraising Strategy',
    'Research & Analytics (Survey Design, Data Analysis, Dashboards)',
    'HR Recruitment & Staff Training',
    'Digital Product Development (Chatbots, Websites, Supabase, Payments)',
    'Agri-Business Advisory (Poultry, Goats, Coffee, Vegetables)',
    'Curriculum Design (Entrepreneurship & Leadership Programs)',
    'Public Speaking & Event Moderation'
  ]

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setFormData({ ...formData, date: format(date, 'yyyy-MM-dd') })
  }

  const handleBookingSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Navigate to confirmation page with booking data
        const bookingData = encodeURIComponent(JSON.stringify(result.booking))
        router.push(`/confirmation?data=${bookingData}`)
      } else {
        alert(`Booking failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to book appointment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="https://tibenkana.org/storage/denis-logo-2.png" 
              alt="Denis Tibenkana Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Book Tibenkana
          </h1>
          <p className="text-gray-600">
            Professional Business Advisory & Consulting Services
          </p>
        </header>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-sm text-gray-600">
            Step {step} of 5
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Select a Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service}
                    className={`p-4 border-2 rounded-lg text-left hover:border-blue-500 transition-colors ${
                      formData.service === service
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData({...formData, service})}
                  >
                    <div className="font-medium">{service}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!formData.service}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                How many people will attend?
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Users className="text-gray-400" size={24} />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.groupSize}
                  onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
                  className="w-20 p-2 border border-gray-300 rounded text-center"
                />
                <span className="text-gray-600">people</span>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Meeting Type
              </h2>
              <div className="space-y-4">
                <button
                  className={`w-full p-4 border-2 rounded-lg text-left hover:border-blue-500 transition-colors ${
                    formData.meetingType === 'online'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setFormData({...formData, meetingType: 'online', location: ''})}
                >
                  <div className="flex items-center">
                    <Globe className="mr-3" size={24} />
                    <div>
                      <div className="font-medium">Online Meeting</div>
                      <div className="text-gray-500">Video call via Zoom/Teams</div>
                    </div>
                  </div>
                </button>

                <button
                  className={`w-full p-4 border-2 rounded-lg text-left hover:border-blue-500 transition-colors ${
                    formData.meetingType === 'physical'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setFormData({...formData, meetingType: 'physical'})}
                >
                  <div className="flex items-center">
                    <MapPin className="mr-3" size={24} />
                    <div>
                      <div className="font-medium">In-Person Meeting</div>
                      <div className="text-gray-500">Physical location</div>
                    </div>
                  </div>
                </button>

                {formData.meetingType === 'physical' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter meeting location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!formData.meetingType || (formData.meetingType === 'physical' && !formData.location)}
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Contact Details
              </h2>
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  onClick={() => setStep(5)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Select Date & Time
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <CalendarIcon className="mr-2" size={20} />
                    Select Date
                  </h3>
                  <Calendar 
                    selectedDate={selectedDate || undefined}
                    onDateSelect={handleDateSelect}
                  />
                </div>

                <div>
                  <TimeSlotPicker
                    selectedTime={formData.time}
                    onTimeSelect={(time) => setFormData({...formData, time})}
                    availableSlots={timeSlots}
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Service:</strong> {formData.service}</p>
                  <p><strong>Attendees:</strong> {formData.groupSize} people</p>
                  <p><strong>Type:</strong> {formData.meetingType === 'online' ? 'Online Meeting' : `In-Person at ${formData.location}`}</p>
                  <p><strong>Contact:</strong> {formData.name} ({formData.email})</p>
                  <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setStep(4)}
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                  disabled={!formData.date || !formData.time || isLoading}
                  onClick={handleBookingSubmit}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    'Book Appointment'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}