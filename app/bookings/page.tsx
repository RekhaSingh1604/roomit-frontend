"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [newDate, setNewDate] = useState("");
const [newStartTime, setNewStartTime] = useState("");
const [newEndTime, setNewEndTime] = useState("");

  const searchBookings = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${email}`
    );

    const data = await res.json();

    setBookings(data.data);
  };

  const cancelBooking = async (id: string) => {
    const confirmCancel = confirm(
      "Are you sure?"
    );

    if (!confirmCancel) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    alert(data.message || "Booking Cancelled");

    searchBookings();
  };

  const rescheduleBooking = async (id: string) => {
  if (!newDate || !newStartTime || !newEndTime) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/reschedule`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
      }),
    }
  );

  const data = await res.json();

  alert(
    data.message || "Booking Rescheduled Successfully"
  );

  searchBookings();
};

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-2 w-80"
        />

        <button
          onClick={searchBookings}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border p-5 rounded mb-4"
        >
          <h2 className="font-bold text-xl">
            {booking.title}
          </h2>

          <p>
            Room: {booking.room?.name}
          </p>

          <p>
            Date: {booking.date}
          </p>

          <p>
            Time: {booking.startTime} - {booking.endTime}
          </p>

          <p>
            Status: {booking.status}
          </p>

          {booking.status ===
            "confirmed" && (
            <button
              onClick={() =>
                cancelBooking(
                  booking._id
                )
              }
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Booking
            </button>

            
          )}

          <div className="mt-4 flex flex-col gap-2">
  <input
    type="date"
    onChange={(e) =>
      setNewDate(e.target.value)
    }
    className="border p-2"
  />

  <input
    type="time"
    onChange={(e) =>
      setNewStartTime(e.target.value)
    }
    className="border p-2"
  />

  <input
    type="time"
    onChange={(e) =>
      setNewEndTime(e.target.value)
    }
    className="border p-2"
  />

  <button
    onClick={() =>
      rescheduleBooking(
        booking._id
      )
    }
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Reschedule
  </button>
</div>
        </div>
      ))}
    </div>
  );
}