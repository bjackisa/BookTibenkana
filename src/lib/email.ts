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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function sendBookingEmail(booking: BookingRecord) {
  const locationInfo =
    booking.meetingType === 'online'
      ? 'Online Meeting'
      : `In-Person at ${booking.location ?? ''}`

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
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: ['barackdanieljackisa@gmail.com', 'tibedenis02@gmail.com'],
    subject: `New Booking - ${booking.id}`,
    html
  })
}
