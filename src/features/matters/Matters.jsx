import { Plus, Filter } from 'lucide-react';
import { Button, SearchInput } from '../../components/common';
import MattersTable from './MattersTable';

export default function Matters({ matters, searchTerm, onSearchChange, onMatterClick, onNewMatter }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Matters</h2>
        <Button variant="primary" onClick={onNewMatter}><Plus className="h-4 w-4 mr-2" />New Matter</Button>
      </div>
      <div className="flex items-center space-x-4">
        <SearchInput value={searchTerm} onChange={onSearchChange} placeholder="Search matters, clients, case numbers..." />
        <Button variant="secondary"><Filter className="h-4 w-4 mr-2" />Filter</Button>
      </div>
      <MattersTable matters={matters} onMatterClick={onMatterClick} />
    </div>
  );
}
