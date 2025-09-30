import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  Suspense,
  lazy,
} from "react";

import useTimer from "../hooks/useTimer";
import Navigation from "../features/navigation/Navigation";
import Dashboard from "../features/dashboard/Dashboard";
import Matters from "../features/matters/Matters";

import OfflineBadge from "../components/common/OfflineBadge";

// seed data (initial demo only)
import { SAMPLE_MATTERS, SAMPLE_INVOICES } from "../data";

// repos (IndexedDB CRUD)
import {
  listMatters,
  seedMatters,
  upsertMatter,
  removeMatter,
} from "../data/repositories/mattersRepo";
import {
  listInvoices,
  seedInvoices,
  upsertInvoice,
  // removeInvoice,
} from "../data/repositories/invoicesRepo";
import {
  listHearings,
  seedHearings,
  // upsertHearing, removeHearing,
} from "../data/repositories/hearingsRepo";
import NewInvoiceForm from "../features/billing/NewInvoiceForm";

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

// tiny hook to reflect online/offline state
function useOnline() {
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);
  return online;
}

export default function LawMastersPrototype() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewMatterForm, setShowNewMatterForm] = useState(false);
  // inside component state:
  const [editingMatter, setEditingMatter] = useState(null);

  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);

  // IMPORTANT: show your original dummy data immediately
  const [matters, setMatters] = useState(SAMPLE_MATTERS);
  const [invoices, setInvoices] = useState(SAMPLE_INVOICES);

  const online = useOnline();
  const timer = useTimer();

  // Seed IDB safely and then refresh state from IDB (without breaking first paint)
  useEffect(() => {
    (async () => {
      // Try reading existing IDB data (don’t crash if a store is missing)
      let m = [];
      let i = [];
      try {
        m = await listMatters();
      } catch {
        m = [];
      }
      try {
        i = await listInvoices();
      } catch {
        i = [];
      }

      // If empty, seed with your exact SAMPLE_* (no normalization on seed)
      if (!m.length) {
        try {
          await seedMatters(SAMPLE_MATTERS);
        } catch {
          /* empty */
        }
        try {
          m = await listMatters();
        } catch {
          m = SAMPLE_MATTERS;
        }
      }
      if (!i.length) {
        try {
          await seedInvoices(SAMPLE_INVOICES);
        } catch {
          /* empty */
        }
        try {
          i = await listInvoices();
        } catch {
          i = SAMPLE_INVOICES;
        }
      }

      // Hearings: seed safely (store may not exist yet; ignore errors)
      try {
        const h = await listHearings();
        if (!h.length) {
          try {
            await seedHearings([]);
          } catch {
            /* empty */
          }
        }
      } catch {
        /* ignore */
      }

      // Now update UI from IDB (or fall back to SAMPLE_* if IDB unavailable)
      setMatters(m.length ? m : SAMPLE_MATTERS);
      setInvoices(i.length ? i : SAMPLE_INVOICES);
    })();
  }, []);

  // convenience: refresh lists after any mutation
  const refreshData = useCallback(async () => {
    try {
      const [m, i] = await Promise.all([listMatters(), listInvoices()]);
      setMatters(m.length ? m : SAMPLE_MATTERS);
      setInvoices(i.length ? i : SAMPLE_INVOICES);
    } catch {
      // If IDB throws, keep showing SAMPLE_* so UI never looks empty
      setMatters(SAMPLE_MATTERS);
      setInvoices(SAMPLE_INVOICES);
    }
  }, []);

  const filteredMatters = useMemo(() => {
    if (!searchTerm.trim()) return matters;
    const s = searchTerm.toLowerCase().trim();
    return matters.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.caseNo.toLowerCase().includes(s) ||
        m.client.toLowerCase().includes(s)
    );
  }, [searchTerm, matters]);

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
          <Dashboard matters={matters} onMatterClick={handleMatterClick} />
        );
      case "matters":
        return (
          <Matters
            matters={filteredMatters}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onMatterClick={handleMatterClick}
            onNewMatter={() => setShowNewMatterForm(true)}
            onEditMatter={(m) => setEditingMatter(m)} // NEW
            onDeleteMatter={async (id) => {
              await removeMatter(id);
              await refreshData();
            }} // NEW
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
            <Billing
              invoices={invoices}
              onNewInvoice={() => setShowNewInvoiceForm(true)}
            />
          </Suspense>
        );
      default:
        return (
          <Dashboard matters={matters} onMatterClick={handleMatterClick} />
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

      {/* View matter modal */}
      <Suspense fallback={<Spinner />}>
        {selectedMatter && (
          <MatterDetailModal
            matter={selectedMatter}
            isOpen={!!selectedMatter}
            onClose={handleCloseModal}
          />
        )}
      </Suspense>

      {/* Create Matter */}
      <Suspense fallback={<Spinner />}>
        {showNewMatterForm && (
          <NewMatterForm
            mode="create"
            onClose={() => setShowNewMatterForm(false)}
            onSave={async (data) => {
              await upsertMatter(data);
              await refreshData();
              setShowNewMatterForm(false);
            }}
          />
        )}
      </Suspense>

      {/* Edit Matter */}
      <Suspense fallback={<Spinner />}>
        {editingMatter && (
          <NewMatterForm
            mode="edit"
            initialData={editingMatter}
            onClose={() => setEditingMatter(null)}
            onSave={async (data) => {
              await upsertMatter({ ...editingMatter, ...data });
              await refreshData();
              setEditingMatter(null);
            }}
          />
        )}
      </Suspense>

      {/* New Invoice Form */}
      <Suspense fallback={<Spinner />}>
        {showNewInvoiceForm && (
          <NewInvoiceForm
            onClose={() => setShowNewInvoiceForm(false)}
            onSave={async (inv) => {
              await upsertInvoice(inv);
              await refreshData();
              setShowNewInvoiceForm(false);
            }}
          />
        )}
      </Suspense>

      {/* Offline indicator (fallback to navigator.onLine) */}
      <OfflineBadge show={!online} />
    </div>
  );
}
