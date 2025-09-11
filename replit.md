# Book Tibenkana - Appointment Booking System

## Overview

Book Tibenkana is a professional appointment booking system built with Next.js 15 for Denis Tibenkana's business advisory and consulting services. It provides a streamlined interface for clients to book various types of professional services including food & beverage formulation, process engineering, quality management, certification support, and business development consulting. The application features a multi-step booking process with calendar selection, time slot picking, and form submission, culminating in a confirmation page with booking details.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS for utility-first styling with custom gradient configurations
- **Component Structure**: Modular component design with reusable Calendar and TimeSlotPicker components
- **State Management**: React hooks (useState) for local component state management
- **Form Handling**: React Hook Form for robust form validation and management
- **Navigation**: Next.js App Router for client-side routing between booking steps and confirmation

### UI/UX Design
- **Brand Identity**: Denis Tibenkana logo from https://tibenkana.org/storage/denis-logo-2.png used as favicon and header logo
- **Design System**: Consistent styling using Tailwind CSS with Inter font family
- **Icons**: Lucide React for consistent iconography throughout the application
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **User Experience**: Multi-step booking flow with clear visual feedback and loading states

### Business Services
The system supports booking for 18 professional service categories:
- Food & Beverage Product Formulation
- Process Engineering (Prototype → Stabilize → Scale-Up)
- Quality Management Setup (SOPs, PRPs, HACCP)
- UNBS Q-Mark Certification Support
- Export Readiness & Standards Compliance
- Branding, Packaging & Labeling Design
- Go-to-Market & Marketing Strategy
- Systems Thinking Facilitation & Leadership Workshops
- Entrepreneurship Mentorship (1:1 / Group)
- Training of Trainers (ToT) – Product Dev, QC, Standards
- Business Formalization & Compliance (URSB/URA/etc.)
- Grant/Proposal Writing & Fundraising Strategy
- Research & Analytics (Survey Design, Data Analysis, Dashboards)
- HR Recruitment & Staff Training
- Digital Product Development (Chatbots, Websites, Supabase, Payments)
- Agri-Business Advisory (Poultry, Goats, Coffee, Vegetables)
- Curriculum Design (Entrepreneurship & Leadership Programs)
- Public Speaking & Event Moderation

### API Architecture
- **API Routes**: Next.js API routes using App Router structure
- **Data Storage**: In-memory storage for demonstration purposes (production would use database)
- **Request Handling**: RESTful API design with proper HTTP status codes and error handling
- **Data Validation**: Server-side validation for required booking fields
- **Booking Management**: Unique booking ID generation and confirmation flow

### Date and Time Management
- **Date Library**: date-fns for robust date manipulation and formatting
- **Calendar Logic**: Custom calendar component with date selection constraints and past date blocking
- **Time Slots**: Configurable time slot system with availability checking (9 AM - 4 PM slots)

### Development Environment
- **TypeScript**: Full TypeScript implementation for type safety
- **Linting**: ESLint with Next.js configuration for code quality
- **Build Process**: Next.js build system with PostCSS and Autoprefixer
- **Development Server**: Configured to run on all interfaces (0.0.0.0) port 5000

## External Dependencies

### Core Framework Dependencies
- **Next.js 15.5.3**: React framework for production applications
- **React 19.1.1**: Frontend library for building user interfaces
- **TypeScript 5.9.2**: Static type checking for JavaScript

### UI and Styling
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **Lucide React 0.544.0**: Icon library for React applications
- **Inter Font**: Google Fonts integration through Next.js

### Form and Data Handling
- **React Hook Form 7.62.0**: Performant forms library with easy validation
- **date-fns 4.1.0**: Modern JavaScript date utility library for calendar functionality

### Development Tools
- **ESLint 9.35.0**: Code linting and formatting
- **PostCSS 8.5.6**: CSS transformation tool
- **Autoprefixer 10.4.21**: CSS vendor prefixing

### Type Definitions
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions

## Project Structure

```
book-tibenkana/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── bookings/
│   │   │       └── route.ts          # API endpoints for booking management
│   │   ├── confirmation/
│   │   │   └── page.tsx              # Booking confirmation page
│   │   ├── globals.css               # Global Tailwind CSS styles
│   │   ├── layout.tsx                # Root layout with logo and metadata
│   │   └── page.tsx                  # Main booking flow page
│   └── components/
│       ├── Calendar.tsx              # Interactive calendar component
│       └── TimeSlotPicker.tsx        # Time slot selection component
├── next.config.js                    # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies and scripts
```

Note: The application currently uses in-memory storage for bookings. A production deployment would require integration with a database system such as PostgreSQL, MongoDB, or similar persistent storage solution.