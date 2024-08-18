"use client";

import Link from "next/link";

export const QuickActions = ({
    userId
} : {
    userId: string;
}) => {
    return (
        <div className="flex justify-end space-x-4">
        <Link 
          href={`/dashboard/add-listing?userId=${userId}`}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-500-dark transition-colors duration-200"
        >
          Add New Listing
        </Link>
        <a 
          href="/dashboard/messages"
          className="bg-primary text-secondary py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-200"
        >
          View Messages
        </a>
      </div>
    )
}