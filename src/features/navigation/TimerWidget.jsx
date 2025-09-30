import { Timer } from 'lucide-react';
import { Button } from '../../components/common';

export default function TimerWidget({ timer }) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
      <Timer className="h-4 w-4" />
      <span className="font-mono text-sm">{timer.formatTime()}</span>
      <Button variant="success" size="sm" onClick={timer.toggle}>{timer.isRunning ? 'Stop' : 'Start'}</Button>
      <Button variant="secondary" size="sm" onClick={timer.reset} className="bg-red-500 hover:bg-red-600 text-white border-none">Reset</Button>
    </div>
  );
}
