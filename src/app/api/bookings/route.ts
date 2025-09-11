import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

let initialized = false
async function init() {
  if (!initialized) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        service TEXT NOT NULL,
        group_size INTEGER NOT NULL,
        meeting_type TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        status TEXT NOT NULL
      )
    `)
    initialized = true
  }
}

function mapRow(row: any) {
  return {
    id: row.id,
    service: row.service,
    groupSize: row.group_size,
    meetingType: row.meeting_type,
    name: row.name,
    email: row.email,
    phone: row.phone,
    date: row.date,
    time: row.time,
    createdAt: row.created_at,
    status: row.status
  }
}

export async function POST(request: NextRequest) {
  try {
    await init()
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
    const createdAt = new Date()

    const insertQuery = `
      INSERT INTO bookings (id, service, group_size, meeting_type, name, email, phone, date, time, created_at, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
    `
    const values = [
      bookingId,
      booking.service,
      booking.groupSize,
      booking.meetingType,
      booking.name,
      booking.email,
      booking.phone,
      booking.date,
      booking.time,
      createdAt,
      'confirmed'
    ]
    const { rows } = await pool.query(insertQuery, values)
    const bookingRecord = mapRow(rows[0])

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
  try {
    await init()
    const { rows } = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC')
    const bookings = rows.map(mapRow)
    return NextResponse.json({
      bookings,
      count: bookings.length
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

