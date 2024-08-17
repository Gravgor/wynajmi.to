'use client';
import { useState } from "react";

interface ScheduleVisitFormProps {
  onSubmit: (formData: {
    name: string;
    phone: string;
    email: string;
    preferredDate: string;
  }) => void;
}

export const ScheduleVisitForm: React.FC<ScheduleVisitFormProps> = ({
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    onSubmit({ name, phone, email, preferredDate });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Imię i nazwisko
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jan Kowalski"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
          Telefon
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="123 456 789"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jan.kowalski@example.com"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div></div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#D97706] transition"
      >
        Umów się na oględziny
      </button>
    </form>
  );
};
