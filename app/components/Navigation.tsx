import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              href="/account" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 