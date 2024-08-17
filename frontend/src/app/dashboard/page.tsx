import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { format } from 'date-fns';
import { QuickActions } from "@/components/ui/dashboard/QuickActions";

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

  return (
    <div className="container mx-auto px-4 py-8 bg-background space-y-8">
      {/* Header with User Info and Avatar */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-secondary py-8 px-8 rounded-lg shadow-lg flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
          <img src="/path/to/avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold">Good {format(new Date(), 'p') === 'AM' ? 'morning' : 'afternoon'}, {user.username || 'User'}!</h1>
          <p className="text-lg mt-2">Here is an overview of your account.</p>
          <span className="text-sm mt-2">Last activity: {format(new Date(), 'dd/MM/yyyy')} at {format(new Date(), 'HH:mm')}
          </span>
        </div>
      </header>
      <QuickActions userId={user.id} />
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-accent pb-2">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Total Listings</h3>
            <p className="text-gray-600">{user.listings.length}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Recent Views</h3>
            <p className="text-gray-600">You have had X views in the last 30 days.</p>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-accent pb-2">Recent Listings</h2>
        {user.listings.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {user.listings.slice(0, 5).map((listing) => (
              <li key={listing.id} className="text-gray-600">
                <span className="font-semibold">{listing.title}</span> - {listing.price.toLocaleString()} PLN/mies
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no listings yet.</p>
        )}
      </section>

      {/* Manage Your Account */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-accent pb-2">Manage Your Account</h2>
        <ul className="list-none space-y-2">
          <li>
            <a href="/dashboard/profile" className="text-primary hover:text-primary-dark transition-colors duration-200">Update Profile</a>
          </li>
          <li>
            <a href="/dashboard/history" className="text-primary hover:text-primary-dark transition-colors duration-200">View Booking History</a>
          </li>
          <li>
            <a href="/dashboard/favorites" className="text-primary hover:text-primary-dark transition-colors duration-200">Favorite Listings</a>
          </li>
          <li>
            <a href="/dashboard/support" className="text-primary hover:text-primary-dark transition-colors duration-200">Support</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
