# RoomIt – Meeting Room Booking System

## Overview

RoomIt is a full-stack meeting room booking application built using Next.js, Express.js, and MongoDB. The system allows employees to view room availability, create bookings, manage existing bookings, and cancel or reschedule reservations.

The application is designed to prevent booking conflicts and provide a smooth room reservation experience.

---

## Features

### Room Listing

* View all available meeting rooms
* Display room capacity and location details

### Room Availability

* Check room availability by date
* 30-minute slot-based scheduling
* Availability refreshes automatically after booking actions
* Green slots indicate available time slots
* Red slots indicate booked or unavailable slots

### Create Booking

Users can:

* Enter name and email
* Add meeting title
* Select booking date
* Choose start and end time
* Book multiple consecutive slots

### My Bookings

* Search bookings using email address
* View all existing bookings
* Track booking status

### Cancel Booking

* Cancel existing reservations
* Booking status updates automatically
* Cancelled bookings immediately free their reserved slots

### Reschedule Booking

Users can:

* Change booking date
* Modify start time
* Modify end time
* Revalidate availability before confirming changes

### Buffer Time Support

* Buffer slots are automatically blocked after bookings
* Prevents immediate back-to-back room usage
* Buffer slots are automatically reserved and appear unavailable for booking.

## Double Booking Prevention

The system prevents multiple users from booking the same room slot.
A unique compound index is used on:RoomId + date + slotStart
This guarantees that overlapping bookings cannot be created even when multiple requests arrive simultaneously.


### Refund Window Support

Bookings cancelled within the refund window are marked:
- cancelled-refundable
Bookings cancelled after the refund window are marked:
- cancelled-non-refundable

  
## Tech Stack
### Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS

### Backend
* Express.js
* Node.js

### Database
* MongoDB Atlas

## Environment Variables

Create a `.env.local` file inside the frontend project root:

```env
NEXT_PUBLIC_API_URL=https://roomit-backend-yk2h.onrender.com/api/rooms
```


## API Base URL

Backend API:
https://roomit-backend-yk2h.onrender.com/api/rooms
https://roomit-backend-yk2h.onrender.com/api/seed
https://roomit-backend-yk2h.onrender.com/api/bookings

Backend Health Check:
https://roomit-backend-yk2h.onrender.com/

Rooms Endpoint:
https://roomit-backend-yk2h.onrender.com/api/rooms


## Installation
Clone the repository:

```bash
https://github.com/RekhaSingh1604/roomit-frontend.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:3000
```

---

## Application Pages

### Home Page

Route:

```bash
/
```

Displays all available meeting rooms.

### Room Details


Features:

* Room availability view
* Booking form
* Slot selection
* Real-time updates

### My Bookings

Route:

```bash
/bookings
```

Features:

* Search bookings by email
* Cancel bookings
* Reschedule bookings
* View booking status

---

## Deployment

### Frontend

Deployed on Vercel:https://roomit-frontend-2wtv.vercel.app/

### Backend

Deployed on Render: https://roomit-backend-yk2h.onrender.com

### Database
MongoDB Atlas


## Implemented Extended Features

### Section 4.3 – Buffer Time Between Bookings

* Automatically blocks buffer slots after bookings
* Prevents overlapping usage during cleanup periods

### Section 4.4 – Reschedule with Re-validation

* Allows users to modify booking schedules
* Re-checks slot availability before updating booking

---

## Future Improvements

* Email notifications for booking confirmations
* Calendar integration
* User authentication and role management
* Advanced room filtering and search
