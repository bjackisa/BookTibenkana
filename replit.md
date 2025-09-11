# Book Tibenkana - Appointment Booking System

## Overview

Book Tibenkana is a professional appointment booking system built with Next.js 15. It provides a streamlined interface for users to book various types of appointments including consultations, training sessions, workshops, meetings, and presentations. The application features a multi-step booking process with calendar selection, time slot picking, and form submission, culminating in a confirmation page with booking details.

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
- **Design System**: Consistent styling using Tailwind CSS with Inter font family
- **Icons**: Lucide React for consistent iconography throughout the application
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **User Experience**: Multi-step booking flow with clear visual feedback and loading states

### API Architecture
- **API Routes**: Next.js API routes using App Router structure
- **Data Storage**: In-memory storage for demonstration purposes (production would use database)
- **Request Handling**: RESTful API design with proper HTTP status codes and error handling
- **Data Validation**: Server-side validation for required booking fields

### Date and Time Management
- **Date Library**: date-fns for robust date manipulation and formatting
- **Calendar Logic**: Custom calendar component with date selection constraints
- **Time Slots**: Configurable time slot system with availability checking

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
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Lucide React 0.544.0**: Icon library for React applications
- **Inter Font**: Google Fonts integration through Next.js

### Form and Data Handling
- **React Hook Form 7.62.0**: Performant forms library with easy validation
- **date-fns 4.1.0**: Modern JavaScript date utility library

### Development Tools
- **ESLint 9.35.0**: Code linting and formatting
- **PostCSS 8.5.6**: CSS transformation tool
- **Autoprefixer 10.4.21**: CSS vendor prefixing

### Type Definitions
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions

Note: The application currently uses in-memory storage for bookings. A production deployment would require integration with a database system such as PostgreSQL, MongoDB, or similar persistent storage solution.