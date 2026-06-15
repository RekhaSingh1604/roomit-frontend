"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* <h1 className="text-4xl font-bold mb-8 text-center">
        Meeting Room Booking
      </h1> */}
<h1 className="text-5xl font-bold text-center mb-10">
  Meeting Room Booking
</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room: any) => (
          <div
            key={room._id}
            className="inline-block mt-5
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
px-5
py-3
rounded-xl
font-semibold"
          >
            <h2 className="text-2xl font-semibold">
              {room.name}
            </h2>

            <p className="mt-2">
              📍 {room.location}
            </p>

            <p>
              👥 Capacity: {room.capacity}
            </p>

            <Link
              href={`/rooms/${room._id}`}
              className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Availability
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}