export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo i opis */}
            <div className="mb-8 md:mb-0">
              <img src="/images/logo.png" alt="Wynajmi.to Logo" className="w-32 mb-4" />
              <p className="text-gray-400">
                Wynajmi.to - Twoje zaufane źródło mieszkań na wynajem.
              </p>
            </div>
  
            {/* Szybkie linki */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-8 md:mb-0">
              <a href="#about" className="hover:text-gray-400 transition">O nas</a>
              <a href="#contact" className="hover:text-gray-400 transition">Kontakt</a>
              <a href="#privacy" className="hover:text-gray-400 transition">Polityka prywatności</a>
              <a href="#faq" className="hover:text-gray-400 transition">FAQ</a>
            </div>
  
            {/* Ikony mediów społecznościowych */}
            <div className="flex space-x-4 mb-8 md:mb-0">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2a6 6 0 00-6 6v4H4v4h4v10h4V12h4l2-4h-6V8a2 2 0 012-2h2v2h-2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h8zM4 6a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zM9 9a3 3 0 016 0 3 3 0 01-6 0zM16 9a3 3 0 00-3 3 3 3 0 006 0 3 3 0 00-3-3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 3a2 2 0 012-2h12a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm4-1a1 1 0 00-1 1v2h2V3H7zm12 0v2h-2V4a1 1 0 011-1h1a1 1 0 011 1zM7 10v8h4v-8H7zm4-2v-2h4v2h-4z" />
                </svg>
              </a>
            </div>
  
            {/* Formularz zapisu do newslettera */}
            <div className="flex flex-col items-center">
              <p className="text-gray-400 mb-4">
                Zapisz się na nasz newsletter i otrzymuj najlepsze oferty!
              </p>
              <form className="flex flex-col md:flex-row">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="p-3 border border-gray-700 rounded-md mb-4 md:mb-0 md:mr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[#F59E0B] rounded-md font-semibold hover:bg-gray-200 transition"
                >
                  Zapisz się
                </button>
              </form>
            </div>
          </div>
  
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Wynajmi.to. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  