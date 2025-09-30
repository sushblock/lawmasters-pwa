export default function CalendarView() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar</h2>
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="text-center font-medium text-gray-500 py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 6;
            const isToday = day === 24;
            const hasHearing = [15, 18, 22].includes(day);
            return (
              <div key={i} className={`aspect-square p-2 rounded-lg border transition-all cursor-pointer ${
                day<1||day>31?'bg-gray-50 text-gray-300':
                isToday?'bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold':
                hasHearing?'bg-gradient-to-br from-orange-100 to-red-100 text-orange-800 border-orange-300':
                'bg-white hover:bg-gray-50 text-gray-700'
              }`}>
                {day>0 && day<=31 && (<div><span className="text-sm">{day}</span>{hasHearing&&<div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>}</div>)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
