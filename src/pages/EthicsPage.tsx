import { Shield, Heart, Users, Globe } from 'lucide-react';

export function EthicsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ethics Framework</h1>
        <p className="mt-2 text-gray-600">Guide your decisions with ethical principles</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Professional Ethics</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
              <span className="text-gray-600">Maintain high standards of integrity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
              <span className="text-gray-600">Respect intellectual property</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
              <span className="text-gray-600">Protect user privacy and data</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Community Impact</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-gray-600">Foster inclusive environments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-gray-600">Support diversity initiatives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-gray-600">Contribute to community growth</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 