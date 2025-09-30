import { Gavel, Timer as TimerIcon } from 'lucide-react';
export default function MobileSidebar({ isOpen, onClose, navItems, currentView, onNavigate, timer }) {
  if (!isOpen) return null;
  return (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 to-purple-900 shadow-xl" onClick={(e)=>e.stopPropagation()}>
        <div className="p-6">
          <button onClick={()=>{ onNavigate('dashboard'); onClose(); }} className="flex items-center space-x-2 mb-8 hover:opacity-80 p-2 rounded-lg hover:bg-white/10">
            <Gavel className="h-8 w-8 text-yellow-400" /><span className="text-xl font-bold text-white">LawMasters</span>
          </button>
          <div className="space-y-2">
            {navItems.map(item => (
              <button key={item.key} onClick={()=>onNavigate(item.key)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${currentView===item.key ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-white/20'}`}>
                <item.icon className="h-5 w-5" /><span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <TimerIcon className="h-4 w-4 text-white" />
              <span className="font-mono text-sm text-white">{timer.formatTime()}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={timer.toggle} className="flex-1 px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-xs font-medium text-white">
                {timer.isRunning ? 'Stop' : 'Start'}
              </button>
              <button onClick={timer.reset} className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-xs font-medium text-white">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
