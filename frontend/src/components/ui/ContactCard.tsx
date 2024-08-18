"use client";
import { FaPhoneAlt, FaEnvelope, FaRegCalendarAlt } from 'react-icons/fa';
import { Avatar, Button, Card, CardBody, CardHeader, Link } from '@nextui-org/react';
import { MyButton } from './Button';
import {RangeCalendar} from "@nextui-org/calendar";
import { getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import {useLocale} from "@react-aria/i18n";

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
  let now = today(getLocalTimeZone())
  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let {locale} = useLocale();

  let isDateUnavailable = (date: any) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );
  return (
    <Card className="max-w-[450px]">
    <CardHeader className="flex items-center gap-3">
      <Avatar src={`https://i.pravatar.cc/150?u=${id}`} alt={name} />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">Osoba prywatna</p>
      </div>
    </CardHeader>
    <CardBody>
      <div className="flex items-center gap-3">
        <FaPhoneAlt className="text-xl text-primary" />
        <Link href={`tel:${phoneNumber}`} className="text-gray-700">{phoneNumber}</Link>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <FaEnvelope className="text-xl text-primary" />
        <Link href={`mailto:${email}`} className="text-gray-700">{email}</Link>
      </div>
      <div className="flex flex-col items-center gap-3 mt-2">
        <span className="text-xl text-primary">
          Dostępne terminy na oględziny
        </span>
        <RangeCalendar 
        isReadOnly={true}
        aria-label="Date (Unavailable)"
        isDateUnavailable={isDateUnavailable} 
        />
      </div>
      <div className="flex items-center gap-3 mt-2">
        <FaRegCalendarAlt className="text-xl text-primary" />
        <Link href={`/properties/offer/${id}/schedule-visit`} className="text-gray-700">Umów spotkanie</Link>
      </div>
      <div className="mt-4">
        <MyButton size="xl" color="accent">Wyślij wiadomość</MyButton>
      </div>
    </CardBody>
    </Card>
  );
};
