# Wynajmi.to

## Opis projektu

Wynajmi.to to nowoczesna aplikacja do wyszukiwania mieszkań i nieruchomości. Umożliwia użytkownikom wyszukiwanie ofert według lokalizacji, typu nieruchomości i zakresu cenowego. Oferuje również szczegółowe informacje o nieruchomościach, w tym galerię zdjęć, opis, lokalizację na mapie oraz dane kontaktowe.

## Funkcjonalności

- Wyszukiwanie nieruchomości według lokalizacji, typu i zakresu cenowego.
- Wyświetlanie szczegółowych informacji o nieruchomości.
- Przeglądanie galerii zdjęć nieruchomości z możliwością powiększania zdjęć.
- Wyświetlanie lokalizacji nieruchomości na mapie Google.
- Nowoczesny i responsywny interfejs użytkownika.

## Technologie

- **React**: Biblioteka do budowania interfejsów użytkownika.
- **Tailwind CSS**: Framework do stylizacji z użyciem utility classes.
- **Next.js**: Framework do renderowania po stronie serwera i budowania aplikacji React.
- **TypeScript**: Język programowania dodający statyczne typowanie do JavaScriptu.
- **Google Maps API**: API do wyświetlania map i lokalizacji.

## Instalacja

1. **Sklonuj repozytorium:**

    ```bash
    git clone https://github.com/Gravgor/wynajmi.to
    cd frontend
    ```

2. **Zainstaluj zależności:**

    ```bash
    npm install
    ```

3. **Uruchom lokalny serwer deweloperski:**

    ```bash
    npm run dev
    ```

    Otwórz przeglądarkę i przejdź do `http://localhost:3000` aby zobaczyć aplikację w działaniu.

## Struktura katalogów

/src
/actions # Pliki związane z akcjami serwera (np. pobieranie danych)
/components # Komponenty UI aplikacji
/ui
/Map.tsx # Komponent wyświetlający mapę
/ListingOffer.tsx # Komponent wyświetlający ofertę nieruchomości
/SearchForm.tsx # Formularz wyszukiwania
/NextjsImage.tsx # Komponent obrazów z Next.js
/mock # Przykładowe dane do aplikacji
/pages # Strony aplikacji (np. /property/[id])
/types # Typy TypeScript
/utils # Funkcje pomocnicze
/classNames.ts # Funkcja do łączenia klas CSS

## Konfiguracja Google Maps API

Aby używać Google Maps API, musisz uzyskać klucz API z [Google Cloud Platform](https://cloud.google.com/maps-platform/). Dodaj swój klucz API do zmiennych środowiskowych `.env.local`:

## Przykłady użycia

### Komponent `SearchForm`

Formularz wyszukiwania nieruchomości:

```jsx
<SearchForm onSearch={(query) => console.log(query)} />
```

### Komponent ListingPhotos
Galeria zdjęć nieruchomości z możliwością powiększania:

```jsx
<ListingPhotos images={['/images/1.jpg', '/images/2.jpg']} location="Warszawa, Centrum" />
```

### Komponent MapComponent
Mapa z lokalizacją nieruchomości:

```jsx
<MapComponent latitude={52.22977} longitude={21.01178} />
```

### Współpraca
Jeśli chcesz wnieść wkład do projektu, otwórz pull request lub zgłoś problem. Chętnie przyjme pomoc!
