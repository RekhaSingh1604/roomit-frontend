"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RoomDetails() {
  const params = useParams();

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [slots, setSlots] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const loadAvailability = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${params.id}/availability?date=${date}`
    );

    const data = await res.json();

    setSlots(data);
  };

  useEffect(() => {
    loadAvailability();
  }, [params.id, date]);

  const handleBooking = async () => {
    if (startTime >= endTime) {
  alert("End time must be greater than start time");
  return;
}

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: params.id,
            date,
            startTime,
            endTime,
            title,
            name,
            email,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Booking Created Successfully");

        loadAvailability();

        setName("");
        setEmail("");
        setTitle("");
        setStartTime("");
        setEndTime("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // return (
  //   <div className="p-10">

  //     <h1 className="text-3xl font-bold mb-6">
  //       Room Availability
  //     </h1>

  //     <input
  //       type="date"
  //       value={date}
  //       onChange={(e) => setDate(e.target.value)}
  //       className="border p-2 mb-6"
  //     />

  //     <div className="grid grid-cols-3 gap-3 mb-10">
  //       {slots?.available?.map((slot: string) => (
  //         <div
  //           key={slot}
  //           className="bg-green-500 text-white p-3 rounded text-center"
  //         >
  //           {slot}
  //         </div>
  //       ))}

  //       {slots?.booked?.map((slot: string) => (
  //         <div
  //           key={slot}
  //           className="bg-red-500 text-white p-3 rounded text-center"
  //         >
  //           {slot}
  //         </div>
  //       ))}
  //     </div>

  //     <div className="border p-6 rounded">

  //       <h2 className="text-2xl font-bold mb-4">
  //         Book Room
  //       </h2>

  //       <input
  //         type="text"
  //         placeholder="Name"
  //         value={name}
  //         onChange={(e) =>
  //           setName(e.target.value)
  //         }
  //         className="border p-2 w-full mb-3"
  //       />

  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) =>
  //           setEmail(e.target.value)
  //         }
  //         className="border p-2 w-full mb-3"
  //       />

  //       <input
  //         type="text"
  //         placeholder="Meeting Title"
  //         value={title}
  //         onChange={(e) =>
  //           setTitle(e.target.value)
  //         }
  //         className="border p-2 w-full mb-3"
  //       />

  //       <input
  //         type="time"
  //         value={startTime}
  //         onChange={(e) =>
  //           setStartTime(e.target.value)
  //         }
  //         className="border p-2 w-full mb-3"
  //       />

  //       <input
  //         type="time"
  //         value={endTime}
  //         onChange={(e) =>
  //           setEndTime(e.target.value)
  //         }
  //         className="border p-2 w-full mb-3"
  //       />

  //       <button
  //         onClick={handleBooking}
  //         className="bg-blue-500 text-white px-5 py-2 rounded"
  //       >
  //         Book Room
  //       </button>

  //     </div>
  //   </div>
  // );


  return (
  <div className="min-h-screen bg-gray-100 p-8">

    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-8">
        Meeting Room Booking
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <label className="font-semibold block mb-2">
          Select Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg mb-6">
  <h3 className="font-bold">
    Room Buffer Time
  </h3>

  <p>
    This room has a 10 minute buffer after
    every booking.
  </p>
</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Available Slots
        </h2>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"> */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {slots?.available?.map((slot: string) => (
            <div
              key={slot}
              // className="bg-green-100 border border-green-400 text-green-700 font-medium text-center p-3 rounded-lg hover:scale-105 transition"
              className="
bg-white
shadow-md
border-l-4
border-green-500
p-4
rounded-xl
text-center
font-semibold
hover:shadow-lg
transition
"
            >
              🟢 {slot}
            </div>
          ))}

          {slots?.booked?.map((slot: string) => (
            <div
              key={slot}
              className="
bg-white
shadow-md
border-l-4
border-red-500
p-4
rounded-xl
text-center
font-semibold
opacity-80
"
              // className="bg-red-100 border border-red-400 text-red-700 font-medium text-center p-3 rounded-lg"
            >
              🔴 {slot}
            </div>
          ))}

        </div>

      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Book Room
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <input
          type="text"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">

          <div>
            <label className="block mb-2 font-medium">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
              className="border p-3 rounded-lg w-full"
            />
          </div>

        </div>

        <button
          onClick={handleBooking}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Book Room
        </button>

      </div>

    </div>

  </div>
);
}