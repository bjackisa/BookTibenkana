import { CalendarX2 } from 'lucide-react'

export default function MaintenanceNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-full bg-blue-100 shadow-inner">
            <CalendarX2 className="text-blue-600" size={64} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Scheduled Maintenance
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          This service from Tibenkana Denis is currently down. Please check back later.
        </p>
        <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6">
          <p className="text-base text-gray-500">
            Our booking calendar is being refreshed to serve you better. We appreciate your
            patience and look forward to helping you schedule your next consultation soon.
          </p>
        </div>
      </div>
    </div>
  )
}
