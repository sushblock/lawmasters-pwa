import { useMemo, useState, useCallback, Suspense, lazy } from "react";
import useTimer from "../hooks/useTimer";
import Navigation from "../features/navigation/Navigation";
import Dashboard from "../features/dashboard/Dashboard";
import Matters from "../features/matters/Matters";
import { SAMPLE_MATTERS, SAMPLE_INVOICES } from "../data";

import useCachedResource from "../hooks/useCachedResource";
import { getAll, putAll } from "../data/db";
import OfflineBadge from "../components/common/OfflineBadge";

// lazy imports
const NewMatterForm = lazy(() => import("../features/matters/NewMatterForm"));
const MatterDetailModal = lazy(() =>
  import("../features/matters/MatterDetailModal")
);
const CalendarView = lazy(() => import("../features/calendar/CalendarView"));
const Billing = lazy(() => import("../features/billing/Billing"));

// simple fallback
function Spinner() {
  return <div className="p-6 text-center text-sm text-gray-500">Loading…</div>;
}

// TEMP fetchers (simulate API). Replace with real API later.
const fetchMatters = async () => {
  await new Promise((r) => setTimeout(r, 120));
  return SAMPLE_MATTERS;
};
const fetchInvoices = async () => {
  await new Promise((r) => setTimeout(r, 120));
  return SAMPLE_INVOICES;
};

export default function LawMastersPrototype() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewMatterForm, setShowNewMatterForm] = useState(false);
  const timer = useTimer();

  // NEW: cached resources
  const { data: mattersData = [], status: mattersStatus } = useCachedResource({
    cacheKey: "matters",
    fetcher: fetchMatters,
    reader: () => getAll("matters"),
    writer: (items) => putAll("matters", items),
  });

  const { data: invoicesData = [], status: invoicesStatus } = useCachedResource(
    {
      cacheKey: "invoices",
      fetcher: fetchInvoices,
      reader: () => getAll("invoices"),
      writer: (items) => putAll("invoices", items),
    }
  );

  const filteredMatters = useMemo(() => {
    const list = mattersData;
    if (!searchTerm.trim()) return list;
    const s = searchTerm.toLowerCase().trim();
    return list.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.caseNo.toLowerCase().includes(s) ||
        m.client.toLowerCase().includes(s)
    );
  }, [searchTerm, mattersData]);

  const handleSearchChange = useCallback(
    (e) => setSearchTerm(e.target.value),
    []
  );
  const handleMatterClick = useCallback((m) => setSelectedMatter(m), []);
  const handleCloseModal = useCallback(() => setSelectedMatter(null), []);

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard matters={mattersData} onMatterClick={handleMatterClick} />
        );
      case "matters":
        return (
          <Matters
            matters={filteredMatters}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onMatterClick={handleMatterClick}
            onNewMatter={() => setShowNewMatterForm(true)}
          />
        );
      case "calendar":
        return (
          <Suspense fallback={<Spinner />}>
            <CalendarView />
          </Suspense>
        );
      case "billing":
        return (
          <Suspense fallback={<Spinner />}>
            <Billing invoices={invoicesData} />
          </Suspense>
        );
      default:
        return (
          <Dashboard matters={mattersData} onMatterClick={handleMatterClick} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation
        currentView={currentView}
        onNavigate={setCurrentView}
        timer={timer}
      />

      {/* tip strip unchanged */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-medium mb-2">
            🎯 Interactive Demo - Try These Features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-center">
            <div>• Click navigation buttons (Dashboard, Matters, etc.)</div>
            <div>• In Matters: Click case rows and use search box</div>
            <div>• Shrink window to see mobile sidebar</div>
            <div>• Start/stop timer in nav bar</div>
          </div>
        </div>
      </div>

      {renderCurrentView()}

      <Suspense fallback={<Spinner />}>
        {selectedMatter && (
          <MatterDetailModal
            matter={selectedMatter}
            isOpen={!!selectedMatter}
            onClose={handleCloseModal}
          />
        )}
      </Suspense>

      <Suspense fallback={<Spinner />}>
        {showNewMatterForm && (
          <NewMatterForm
            onClose={() => setShowNewMatterForm(false)}
            onSave={(data) => {
              console.log("New matter created:", data);
              setShowNewMatterForm(false);
            }}
          />
        )}
      </Suspense>

      {/* Offline indicator */}
      <OfflineBadge
        show={mattersStatus === "offline" || invoicesStatus === "offline"}
      />
    </div>
  );
}
