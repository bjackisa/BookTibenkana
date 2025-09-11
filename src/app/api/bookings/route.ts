import { NextRequest, NextResponse } from 'next/server'

// In a real app, this would connect to a database
const bookings: any[] = []

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json()
    
    // Validate required fields
    const requiredFields = ['service', 'groupSize', 'meetingType', 'name', 'email', 'phone', 'date', 'time']
    const missingFields = requiredFields.filter(field => !booking[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate booking ID
    const bookingId = `BT-${Date.now().toString().slice(-6)}`
    
    // Create booking record
    const bookingRecord = {
      id: bookingId,
      ...booking,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    }

    // Store booking (in memory for demo)
    bookings.push(bookingRecord)

    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      message: 'Appointment booked successfully'
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    bookings: bookings,
    count: bookings.length
  })
}