"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaRegCalendarAlt } from 'react-icons/fa';

type ContactCardProps = {
  id: string;
  name: string;
  phoneNumber?: string;
  email: string;
}

export const ContactCard = ({
  id,
  name,
  phoneNumber,
  email,
}: ContactCardProps) => {
  return (
    <div className="flex-1 bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/images/placeholders/testimonial/jan.jpg" // Zaktualizuj ścieżkę do zdjęcia
          alt="Zdjęcie kontaktowe"
          width={120}
          height={64}
          objectFit="cover"
          className="rounded-full shadow-md border-4 border-primary"
        />
        <h1 className="text-2xl font-semibold mt-4 text-gray-800">{name}</h1>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <FaPhoneAlt className="text-primary w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Telefon</h2>
            <p className="text-md text-gray-600">{phoneNumber || 'Brak numeru telefonu'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <FaEnvelope className="text-primary w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">E-mail</h2>
            <p className="text-md text-gray-600">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <FaRegCalendarAlt className="text-primary w-6 h-6" />
          <div className='flex flex-col'>
            <h2 className="text-lg font-semibold text-gray-800">Oględziny mieszkania</h2>
            <Link href={`/properties/offer/${id}/schedule-visit`} className="mt-2 w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center">
              Umów się na oględziny
            </Link>
          </div>
        </div>
        <Link href={`mailto:${email}`} className="block w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-500-dark transition duration-200 text-center">
          Napisz wiadomość
        </Link>
      </div>
    </div>
  );
};
