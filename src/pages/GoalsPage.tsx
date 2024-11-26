import { Target, ArrowRight } from 'lucide-react';

export function GoalsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Goals & Legacy Planning</h1>
        <p className="mt-2 text-gray-600">Define and track your long-term vision and goals</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Long-term Vision</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Define Your Legacy</h3>
          <p className="text-gray-600 mb-4">Create a clear vision of the impact you want to make in STEM and community empowerment.</p>
          <button className="flex items-center text-indigo-600 hover:text-indigo-700">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        {/* Add more goal-related components here */}
      </div>
    </div>
  );
}