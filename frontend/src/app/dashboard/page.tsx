import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { format } from 'date-fns';
import { QuickActions } from "@/components/ui/dashboard/QuickActions";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    return <div className="container mx-auto px-4 py-8 text-center">You must be authenticated to view this page</div>;
  }

  const user = await prisma?.user.findUnique({
    where: {
      email: session.user?.email ?? undefined,
    },
    include: {
      listings: true,
    },
  });

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">User not found</div>;
  }

  const accountTypeLabel = {
    'company': 'Firma Wynajmująca',
    'private': 'Osoba Prywatna Wynajmująca',
    'tenant': 'Wynajmujący'
  }
  return (
    <div className="container mx-auto px-6 py-8 bg-[#F3F4F6] space-y-8">
    <header className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center md:space-x-6">
  <div className="flex items-center space-x-4 mb-4 md:mb-0">
    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300">
      <img src="/path/to/avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
    </div>
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Good {format(new Date(), 'p') === 'AM' ? 'morning' : 'afternoon'}, {user.firstName + ' ' + user.lastName} 🌞
      </h1>
      <p className="text-sm text-gray-600">Typ konta: <span className="font-medium">{accountTypeLabel.private}</span></p>
    </div>
  </div>
  <div className="flex flex-col items-end space-y-4">
  <span className="text-sm text-gray-500">Last activity: {format(new Date(), 'dd/MM/yyyy')} at {format(new Date(), 'HH:mm')}</span>
    <QuickActions userId={user.id} />
  </div>
</header>

    <section className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-[#F59E0B] pb-2">User Statistics</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#3B82F6] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18V3H3z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h14v18H5V3z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Listings</h3>
        <p className="text-3xl font-bold text-gray-800">{user.listings.length}</p>
      </div>
    </div>

    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#F59E0B] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a9 9 0 0118 0"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12V8l-3-2"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Recent Views</h3>
        <p className="text-3xl font-bold text-gray-800">X views in the last 30 days</p>
      </div>
    </div>

    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#10B981] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5l7 7-7 7-7-7 7-7"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Average Price</h3>
        <p className="text-3xl font-bold text-gray-800">{(user.listings.reduce((acc, listing) => acc + listing.price, 0) / user.listings.length).toFixed(2)} PLN</p>
      </div>
    </div>
    
  </div>
</section>

    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-[#F59E0B] pb-2">Recent Listings</h2>
      {user.listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.listings.slice(0, 6).map((listing) => (
            <div key={listing.id} className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden">
              <img src={listing.images[0] || '/path/to/default-image.jpg'} alt={listing.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
                <p className="text-gray-600 mb-2">{listing.description}</p>
                <p className="text-lg font-semibold text-gray-800">{listing.price.toLocaleString()} PLN/mies</p>
                <p className="text-sm text-gray-500 mt-2">Added on: {format(new Date(listing.createdAt), 'dd/MM/yyyy')}</p>
              </div>
              <div className="bg-gray-100 p-4 flex justify-between items-center">
                <a href={`/properties/offer/${listing.id}`} className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200">
                  <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-full text-sm font-semibold hover:bg-[#2563EB] transition">View Details</button>
                </a>
                <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-full text-sm font-semibold hover:bg-[#D97706] transition">Edit</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no listings yet.</p>
      )}
    </section>

    <section className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-[#F59E0B] pb-2">Manage Your Account</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#3B82F6] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 7h6M9 9h6M9 11h6M9 13h6M9 15h6"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Update Profile</h3>
        <p className="text-gray-600">Manage your personal details and settings.</p>
        <a href="/dashboard/profile" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200">Go to Profile</a>
      </div>
    </div>

    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#F59E0B] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">View Booking History</h3>
        <p className="text-gray-600">Track and manage your past bookings.</p>
        <a href="/dashboard/history" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200">View History</a>
      </div>
    </div>

    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#10B981] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 5.121a4 4 0 015.656 5.656L12 11.313l1.223-1.223a4 4 0 115.656-5.656A4 4 0 0012 7a4 4 0 00-5.656-5.656z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Favorite Listings</h3>
        <p className="text-gray-600">Access and manage your favorite listings.</p>
        <a href="/dashboard/favorites" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200">See Favorites</a>
      </div>
    </div>

    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0 bg-[#EF4444] p-3 rounded-full text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7-7-7-7 7z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Support</h3>
        <p className="text-gray-600">Get help and support for any issues.</p>
        <a href="/dashboard/support" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200">Get Support</a>
      </div>
    </div>
    
  </div>
</section>
  </div>
  );
}
