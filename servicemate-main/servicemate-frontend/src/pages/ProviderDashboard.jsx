import React, { useState } from 'react';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';

const ProviderDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-slate-100 flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
              <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-wider">
                {user?.serviceType} Expert
              </span>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-bold text-slate-500">Status: {isAvailable ? 'Online' : 'Offline'}</p>
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-14 h-8 rounded-full relative transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-all ${isAvailable ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-100">
            <Clock className="text-indigo-600 mb-2" />
            <h4 className="text-slate-500 text-sm">Pending Requests</h4>
            <p className="text-2xl font-bold text-slate-800">0</p>
          </div>
          {/* Add more stats as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;