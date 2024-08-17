import { Listing } from "@/types/Listing";

export const listings: Listing[] = [
  {
    id: 1,
    images: [
      '/images/placeholders/listing/offer1-1.jpg',
      '/images/placeholders/listing/offer1-2.jpg',
      '/images/placeholders/listing/offer1-3.jpg',
      '/images/placeholders/listing/offer1-4.jpg',
      '/images/placeholders/listing/offer1-5.jpg',
      '/images/placeholders/listing/offer1-6.jpg',
      '/images/placeholders/listing/offer1-7.jpg',
    ],
    location: 'Warszawa, Centrum',
    price: '3000 PLN/mies.',
    propertyType: '1-bedroom',
    bedrooms: 1,
    rooms: '2',
    area: 'Centrum',
    amenities: ['balkon', 'klimatyzacja', 'winda'],
    size: '45',
    detailPageUrl: '/properties/offer/1',
    description: 'Stylowe mieszkanie w sercu miasta',
    longDescription: 'Przestronne mieszkanie w centrum Warszawy z widokiem na Pałac Kultury i Nauki. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 5 piętrze.',
    contactPerson: {
      name: 'Jan Kowalski',
      phoneNumber: '+48 123 456 789',
      email: 'jankowalski@gmail.com',
  },
  availableDates: [
    {
      date: '2024-08-22',
      times: ['10:00', '12:00', '14:00', '16:00']
    },
    {
      date: '2024-08-23',
      times: ['10:00', '12:00', '14:00', '16:00']
    },
    ]
  },
  {
    id: 2,
    images: [
      '/images/placeholders/listing/offer2-3.jpg',
      '/images/placeholders/listing/offer2-1.jpg',
      '/images/placeholders/listing/offer2-2.jpg',
    ],
    location: 'Kraków, Stare Miasto',
    price: '2500 PLN/mies.',
    propertyType: 'studio',
    bedrooms: 0,
    rooms: '1',
    area: 'Stare Miasto',
    amenities: ['klimatyzacja', 'winda'],
    size: '40',
    detailPageUrl: '/properties/offer//2',
    description: 'Komfortowe mieszkanie z widokiem na rynek',
    longDescription: 'Kawalerka w samym sercu Krakowa z widokiem na Rynek Główny. W pełni umeblowana i wyposażona w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 3 piętrze.',
    contactPerson: {
      name: 'Jan Kowalski',
      phoneNumber: '+48 123 456 789',
      email: 'jankowalski@gmail.com'
    },
    availableDates: [
      {
        date: '2024-08-22',
        times: ['10:00', '12:00', '14:00', '16:00']
      },
      {
        date: '2024-08-23',
        times: ['10:00', '12:00', '14:00', '16:00']
      },
    ]
  },
  {
    id: 3,
    images: [
      '/images/placeholders/listing/offer3-3.jpg',
      '/images/placeholders/listing/offer3-1.jpg',
      '/images/placeholders/listing/offer3-2.jpg',
    ],
    location: 'Wrocław, Śródmieście',
    price: '2800 PLN/mies.',
    propertyType: '2-bedroom',
    bedrooms: 2,
    rooms: '3',
    area: 'Śródmieście',
    amenities: ['balkon', 'klimatyzacja', 'winda'],
    size: '50',
    detailPageUrl: '/properties/offer//3',
    description: 'Nowoczesne mieszkanie blisko parku',
    longDescription: 'Przestronne mieszkanie w centrum Wrocławia z widokiem na Park Południowy. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 2 piętrze.',
    contactPerson: {
      name: 'Anna Nowak',
      phoneNumber: '+48 987 654 321',
      email: 'annanowak@gmail.com'
    },
    availableDates: [
      {
        date: '2024-08-22',
        times: ['10:00', '12:00', '14:00', '16:00']
      },
      {
        date: '2024-08-23',
        times: ['10:00', '12:00', '14:00', '16:00']
      },
    ]
  },
  {
    id: 4,
    images: [
      '/images/placeholders/listing/offer4-4.jpg',
      '/images/placeholders/listing/offer4-1.jpg',
      '/images/placeholders/listing/offer4-2.jpg',
    ],
    location: 'Gdańsk, Wrzeszcz',
    price: '3200 PLN/mies.',
    propertyType: '1-bedroom',
    bedrooms: 1,
    rooms: '2',
    area: 'Wrzeszcz',
    amenities: ['balkon', 'klimatyzacja', 'winda'],
    size: '55',
    detailPageUrl: '/properties/offer/4',
    description: 'Przestronne mieszkanie z tarasem',
    longDescription: 'Przestronne mieszkanie w dzielnicy Wrzeszcz z widokiem na Zatokę Gdańską. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 4 piętrze.',
    contactPerson: {
      name: 'Amelia Kowalczyk',
      phoneNumber: '+48 123 456 789',
      email: 'ameliakowalczyk@gmail.com'
  },
  availableDates: [
    {
      date: '2024-08-22',
      times: ['10:00', '12:00', '14:00', '16:00']
    },
    {
      date: '2024-08-23',
      times: ['10:00', '12:00', '14:00', '16:00']
    },
    ]
  },
]