"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Image from "next/image";
import './Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import { getListing } from "@/actions";
import { Listing } from "@/types/Listing";
import { Loading } from "@/components/ui/Loading";
import { ScheduleVisitForm } from "@/components/ui/ScheduleVisitForm";

export default function ScheduleVisitPage({
  params,
}: {
  params: { id: string };
}) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const fetchListing = async () => {
    const listing = await getListing(params.id);
    setListing(listing);
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const handleDateChange = (date: any) => {
    setSelectedDate(date as Date);
    const dateString = (date as Date)?.toISOString().split("T")[0];
    const times =
      listing?.availableDates.find((d) => d.date === dateString)?.times || [];
    setAvailableTimes(times);
    setSelectedTime(null);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];
    const isAvailable = listing?.availableDates.some(
      (d) => d.date === dateString
    );
    return isAvailable ? "bg-green-500 text-white" : "bg-gray-300";
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];
    return !listing?.availableDates.some((d) => d.date === dateString);
  };

  const handleScheduleVisit = async (formData: {
    name: string;
    phone: string;
    email: string;
    preferredDate: string;
  }) => {
    try {
      const response = await fetch("/api/schedule-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          listingId: params.id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (response.ok) {
        alert("Oględziny zostały zaplanowane!");
      } else {
        alert("Wystąpił błąd. Spróbuj ponownie.");
      }
    } catch (error) {
      alert("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Umów się na oględziny</h1>
      {listing ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {listing.description}
            </h2>
            <p className="text-lg text-gray-600">{listing.location}</p>
            <p className="text-lg font-semibold mt-2">{listing.price}</p>
          </div>

          <div className="flex-1">
            {listing.images && (
              <Image
              src={listing.images[0]}
              alt={listing.description}
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Wybierz datę i godzinę oględzin
        </h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />
        {selectedDate && (
          <>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-lg font-semibold mb-2"
              >
                Wybierz godzinę
              </label>
              <select
                id="time"
                value={selectedTime || ""}
                onChange={handleTimeChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Wybierz godzinę</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <ScheduleVisitForm onSubmit={handleScheduleVisit} />
          </>
        )}
      </div>
    </main>
  );
}
