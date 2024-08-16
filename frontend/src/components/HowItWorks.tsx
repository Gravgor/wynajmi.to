import { FaSearch, FaPhone, FaFileContract } from "react-icons/fa";

import Image from "next/image";

export default function HowItWorks() {
    const steps = [
      {
        step: "Wyszukaj mieszkanie",
        description: "Wprowadź swoje kryteria, takie jak lokalizacja, typ nieruchomości i zakres cenowy.",
        icon: <FaSearch className="w-8 h-8 text-[#F59E0B]" />,
      },
      {
        step: "Skontaktuj się z właścicielem",
        description: "Umów się na oglądanie mieszkania, aby upewnić się, że spełnia Twoje oczekiwania.",
        icon: <FaPhone className="w-8 h-8 text-[#F59E0B]" />,
      },
      {
        step: "Wynajmij",
        description: "Podpisz umowę online i wprowadź się do nowego mieszkania bez zbędnych formalności.",
        icon: <FaFileContract className="w-8 h-8 text-[#F59E0B]" />,
      },
    ];
  
    return (
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Jak to działa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  