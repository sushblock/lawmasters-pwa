import { useState } from 'react';
import { BarChart3, FileText, Calendar, DollarSign, Gavel, Menu } from 'lucide-react';
import NavItem from './NavItem';
import MobileSidebar from './MobileSidebar';
import TimerWidget from './TimerWidget';

export default function Navigation({ currentView, onNavigate, timer }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navItems = [
    { key:'dashboard', label:'Dashboard', icon:BarChart3 },
    { key:'matters', label:'Matters', icon:FileText },
    { key:'calendar', label:'Calendar', icon:Calendar },
    { key:'billing', label:'Billing', icon:DollarSign },
  ];
  const handleNavigate = (view) => { onNavigate(view); setIsSidebarOpen(false); };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white shadow-lg relative z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Gavel className="h-8 w-8 text-yellow-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">LawMasters</span>
              </div>
              <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all">
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map(item => (
                <NavItem key={item.key} item={item} isActive={currentView===item.key} onClick={()=>onNavigate(item.key)} />
              ))}
            </div>
            <TimerWidget timer={timer} />
          </div>
        </div>
      </nav>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={()=>setIsSidebarOpen(false)}
        navItems={navItems}
        currentView={currentView}
        onNavigate={handleNavigate}
        timer={timer}
      />
    </>
  );
}
