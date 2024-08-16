import { ContactPerson } from '@/types/Listing';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaRegCalendarAlt } from 'react-icons/fa';

export const ContactCard = ({
    name,
    phoneNumber,
    email,
} : ContactPerson) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[570px] w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/images/placeholders/testimonial/jan."
          alt="Jan Kowalski"
          width={120}
          height={120}
          objectFit="cover"
          className="rounded-full shadow-md"
        />
        <h1 className="text-2xl font-semibold mt-4 text-gray-800">{name}</h1>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-gray-600 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Telefon</h2>
            <p className="text-md text-gray-600">{phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-gray-600 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">E-mail</h2>
            <p className="text-md text-gray-600">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaRegCalendarAlt className="text-gray-600 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Oględziny mieszkania</h2>
            <button className="mt-2 w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
              Umów się na oględziny
            </button>
          </div>
        </div>
        <button className="w-full bg-accent text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
          Napisz wiadomość
        </button>
      </div>
    </div>
  );
};
