'use client';
import Link from 'next/link';

interface DonationCase {
  id: string;
  title: string;
  description: string;
  targetAmount: string;
  currentAmount: string;
}

const mockDonations: DonationCase[] = [
  {
    id: '1',
    title: 'Medical Emergency Fund',
    description: 'Help support urgent medical care needs',
    targetAmount: '5',
    currentAmount: '2.5',
  },
];

export default function DonationList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockDonations.map((donation) => (
        <Link 
          href={`/donation/${donation.id}`} 
          key={donation.id}
          className="block hover:transform hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
            <p className="text-gray-600 mb-4">{donation.description}</p>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(Number(donation.currentAmount) / Number(donation.targetAmount)) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{donation.currentAmount} ETH raised</span>
                <span>Goal: {donation.targetAmount} ETH</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 