export default function StatCard({ label, value, icon: Icon, color, change }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && <p className="text-xs text-white/70 mt-1">{change}</p>}
        </div>
        {Icon && <Icon className="h-8 w-8 text-white/80" />}
      </div>
    </div>
  );
}
