import nodemailer from 'nodemailer'

interface BookingRecord {
  id: string
  service: string
  groupSize: number
  meetingType: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  location?: string
}

export async function sendBookingEmail(booking: BookingRecord) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  // Skip sending if SMTP configuration is incomplete
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.warn('SMTP configuration missing. Email not sent.')
    return
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })
  const locationInfo =
    booking.meetingType === 'online'
      ? 'Online Meeting'
      : `In-Person at ${booking.location ?? ''}`

  const start = new Date(`${booking.date}T${booking.time}:00+03:00`)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const dates = `${formatDate(start)}/${formatDate(end)}`
  const details = `Booking ID: ${booking.id}\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nGroup Size: ${booking.groupSize}\nMeeting Type: ${locationInfo}`
  const location = booking.meetingType === 'online' ? 'Online' : booking.location ?? ''
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    booking.service
  )}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}`

  const html = `
    <h2>New Booking Confirmation</h2>
    <p><strong>Booking ID:</strong> ${booking.id}</p>
    <p><strong>Service:</strong> ${booking.service}</p>
    <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
    <p><strong>Group Size:</strong> ${booking.groupSize}</p>
    <p><strong>Meeting Type:</strong> ${locationInfo}</p>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p style="margin-top:20px;">
      <a href="${calendarUrl}" style="display:inline-block;padding:10px 20px;background-color:#1a73e8;color:#ffffff;text-decoration:none;border-radius:4px;" target="_blank" rel="noopener noreferrer">Confirm & Save to Calendar</a>
    </p>
  `

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: ['barackdanieljackisa@gmail.com', 'tibedenis02@gmail.com'],
      subject: `New Booking - ${booking.id}`,
      html
    })
  } catch (error) {
    console.error('Failed to send booking email:', error)
  }
}
