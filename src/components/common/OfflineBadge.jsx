export default function OfflineBadge({ show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-300 px-3 py-1 text-xs shadow">
      Offline — showing cached data
    </div>
  );
}
