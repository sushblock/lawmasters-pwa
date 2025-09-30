import { Eye, Edit } from 'lucide-react';

export default function MattersTable({ matters, onMatterClick }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Hearing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matters.map(m => (
              <tr key={m.id} className="hover:bg-blue-50 transition-all cursor-pointer border-l-4 border-transparent hover:border-blue-500" onClick={()=>onMatterClick(m)}>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-800">{m.caseNo}</p>
                    <p className="text-sm text-gray-600">{m.title}</p>
                    <p className="text-xs text-gray-500">{m.court}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><p className="text-sm text-gray-900">{m.client}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-gray-900">{m.nextHearing}</p><p className="text-xs text-gray-500">{m.stage}</p></td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    m.priority==='High'?'bg-red-100 text-red-800':m.priority==='Medium'?'bg-yellow-100 text-yellow-800':'bg-green-100 text-green-800'
                  }`}>{m.priority}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1"><Eye className="h-4 w-4" /></button>
                    <button className="text-green-600 hover:text-green-800 p-1"><Edit className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
