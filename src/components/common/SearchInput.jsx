import { Search } from 'lucide-react';
export default function SearchInput({ value, onChange, placeholder="Search..." }) {
  return (
    <div className="flex-1 relative">
      <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        autoComplete="off"
      />
    </div>
  );
}
