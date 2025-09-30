import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // lock background scroll
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  const restore = () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { restore(); onClose?.(); }}>
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl" style={{ maxHeight: 'min(90dvh, calc(100dvh - 2rem))' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={() => { restore(); onClose?.(); }} className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto overscroll-contain" style={{ maxHeight: 'calc(90dvh - 64px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
