import { Calendar, DollarSign, FileText, Users, Bell } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Active Matters" value="24" icon={FileText} color="from-blue-500 to-cyan-500" change="+3 this month" />
      <StatCard label="Today's Hearings" value="3" icon={Calendar} color="from-purple-500 to-pink-500" change="0 this month" />
      <StatCard label="Pending Invoices" value="₹2.5L" icon={DollarSign} color="from-green-500 to-emerald-500" change="-₹50K this month" />
      <StatCard label="Active Clients" value="18" icon={Users} color="from-orange-500 to-red-500" change="+2 this month" />
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center"><Bell className="h-5 w-5 mr-2 text-purple-500" />Recent Activity</h3>
      <div className="space-y-3">
        {['Hearing scheduled for W.P.(C) 8234/2024','Reply filed in CS(OS) 445/2024','Invoice paid by Tech Solutions','New order in CRL.A. 789/2024'].map((activity, i)=>(
          <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full"><Bell className="h-3 w-3 text-purple-600" /></div>
            <div className="flex-1"><p className="text-sm text-gray-900">{activity}</p><p className="text-xs text-gray-500">{['2 hours ago','5 hours ago','1 day ago','2 days ago'][i]}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ matters, onMatterClick }) {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Hearings (uses first 3 items) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />Today's Hearings
          </h3>
          <div className="space-y-3">
            {matters.slice(0,3).map((m,i)=>(
              <div key={m.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all cursor-pointer" onClick={()=>onMatterClick(m)}>
                <div><p className="font-medium text-gray-900">{m.title}</p><p className="text-sm text-gray-600">{m.stage}</p></div>
                <div className="text-right"><p className="font-semibold text-blue-600">{['10:30 AM','2:00 PM','3:30 PM'][i]}</p><p className="text-xs text-gray-500">{m.court}</p></div>
              </div>
            ))}
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
