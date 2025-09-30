// src/features/matters/Matters.jsx
import React from "react";
import { Eye, Edit, Trash2, Filter, Plus } from "lucide-react";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";

/**
 * Props:
 * - matters: Array<Matter>
 * - searchTerm: string
 * - onSearchChange: (e) => void
 * - onMatterClick: (matter) => void
 * - onNewMatter: () => void
 * - onEditMatter?: (matter) => void
 * - onDeleteMatter?: (matterId: string) => Promise<void> | void
 */

export default function Matters({
  matters,
  searchTerm,
  onSearchChange,
  onMatterClick,
  onNewMatter,
  onEditMatter,
  onDeleteMatter,
}) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Matters</h2>
        <Button variant="primary" onClick={onNewMatter}>
          <Plus className="h-4 w-4 mr-2" />
          New Matter
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search matters, clients, case numbers..."
        />
        <Button variant="secondary">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <MattersTable
        matters={matters}
        onMatterClick={onMatterClick}
        onEditMatter={onEditMatter}
        onDeleteMatter={onDeleteMatter}
      />
    </div>
  );
}

function MattersTable({
  matters,
  onMatterClick,
  onEditMatter,
  onDeleteMatter,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <Th>Case Details</Th>
              <Th>Client</Th>
              <Th>Next Hearing</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matters.map((matter) => (
              <tr
                key={matter.id}
                className="hover:bg-blue-50 transition-all cursor-pointer border-l-4 border-transparent hover:border-blue-500"
                onClick={() => onMatterClick?.(matter)}
              >
                <Td>
                  <div>
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      {matter.caseNo}
                    </p>
                    <p className="text-sm text-gray-600">{matter.title}</p>
                    <p className="text-xs text-gray-500">{matter.court}</p>
                  </div>
                </Td>

                <Td>
                  <p className="text-sm text-gray-900">{matter.client}</p>
                </Td>

                <Td>
                  <p className="text-sm text-gray-900">{matter.nextHearing}</p>
                  <p className="text-xs text-gray-500">{matter.stage}</p>
                </Td>

                <Td>
                  <PriorityPill value={matter.priority} />
                </Td>

                <Td>
                  <div className="flex items-center space-x-2">
                    <IconBtn
                      title="View"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMatterClick?.(matter);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </IconBtn>

                    <IconBtn
                      title="Edit"
                      className="text-green-600 hover:text-green-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditMatter?.(matter);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </IconBtn>

                    <IconBtn
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!onDeleteMatter) return;
                        if (confirm("Delete this matter?")) {
                          await onDeleteMatter(matter.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */

function Th({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-6 py-4 align-top">{children}</td>;
}

function IconBtn({ children, className = "", onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      className={`p-1 rounded transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PriorityPill({ value }) {
  // preserve your original, capitalized styles: 'High' | 'Medium' | 'Low' | 'Urgent'
  const v = (value || "").toString();
  const cls =
    v === "High"
      ? "bg-red-100 text-red-800"
      : v === "Medium"
      ? "bg-yellow-100 text-yellow-800"
      : v === "Urgent"
      ? "bg-rose-100 text-rose-800"
      : "bg-green-100 text-green-800";
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${cls}`}
    >
      {v || "Medium"}
    </span>
  );
}
