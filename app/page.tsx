'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">CryptoCare</h1>
          <ConnectButton />
        </div>
        
        <p className="text-lg mb-8 text-center">
          Support verified donation cases with direct ETH transfers
        </p>
      </main>
    </div>
  );
}
