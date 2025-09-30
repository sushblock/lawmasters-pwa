// src/features/matters/MatterDetailModal.jsx
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { Calendar, Clock, MapPin, Trash2, Plus } from "lucide-react";
import {
  listHearingsByMatter,
  upsertHearing,
  removeHearing,
} from "../../data/repositories/hearingsRepo";
import { uid } from "../../models/factories";

export default function MatterDetailModal({ matter, isOpen, onClose }) {
  const [hearings, setHearings] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!matter?.id) return;
      try {
        const h = await listHearingsByMatter(matter.id);
        if (!ignore) setHearings(h);
      } catch {
        if (!ignore) setHearings([]);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [matter?.id]);

  if (!isOpen) return null;

  const reload = async () => {
    const h = await listHearingsByMatter(matter.id);
    setHearings(h);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={matter?.title || ""}>
      {matter && (
        <>
          {/* Top: Case + Client info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="font-semibold text-gray-900 mb-3">
                Case Information
              </h3>
              <div className="space-y-2 text-sm">
                <Row label="Case No">
                  <span className="font-medium">{matter.caseNo}</span>
                </Row>
                <Row label="Court">
                  <span className="font-medium">{matter.court}</span>
                </Row>
                <Row label="Judge">
                  <span className="font-medium">{matter.judge}</span>
                </Row>
                <Row label="Filing Date">
                  <span className="font-medium">{matter.filingDate}</span>
                </Row>
                {matter.stage && (
                  <Row label="Stage">
                    <span className="font-medium">{matter.stage}</span>
                  </Row>
                )}
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-3">
                Client Information
              </h3>
              <div className="space-y-2 text-sm">
                <Row label="Client">
                  <span className="font-medium">{matter.client}</span>
                </Row>
                {matter.opponent && (
                  <Row label="Opponent">
                    <span className="font-medium">{matter.opponent}</span>
                  </Row>
                )}
                {matter.nextHearing && (
                  <Row label="Next Hearing">
                    <span className="font-medium">{matter.nextHearing}</span>
                  </Row>
                )}
                <Row label="Priority">
                  <PriorityPill value={matter.priority} />
                </Row>
                <Row label="Status">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {matter.status}
                  </span>
                </Row>
              </div>
            </section>
          </div>

          {/* Description */}
          {matter.description && (
            <section className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {matter.description}
              </p>
            </section>
          )}

          {/* Hearings */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Hearings</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAdd(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Hearing
              </Button>
            </div>

            {hearings.length === 0 ? (
              <p className="text-sm text-gray-500">No hearings scheduled.</p>
            ) : (
              <div className="space-y-2">
                {hearings.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-sm">
                      <div className="flex items-center gap-2 font-medium text-gray-900">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{formatDateTime(h.dateTime)}</span>
                      </div>
                      {(h.location || h.courtRoom) && (
                        <div className="flex items-center gap-2 text-gray-700 mt-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>
                            {h.location || ""}
                            {h.courtRoom
                              ? h.location
                                ? ` · ${h.courtRoom}`
                                : h.courtRoom
                              : ""}
                          </span>
                        </div>
                      )}
                      {h.notes && (
                        <div className="text-gray-600 mt-1">
                          <span className="text-xs uppercase tracking-wide text-gray-500">
                            Notes:
                          </span>{" "}
                          {h.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                        {h.status || "Scheduled"}
                      </span>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded"
                        title="Delete hearing"
                        onClick={async () => {
                          if (!confirm("Delete this hearing?")) return;
                          await removeHearing(h.id);
                          await reload();
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showAdd && (
              <AddHearingInline
                matterId={matter.id}
                onCancel={() => setShowAdd(false)}
                onSaved={async () => {
                  setShowAdd(false);
                  await reload();
                }}
              />
            )}
          </section>

          {/* Footer actions (keep as before, or customize) */}
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

/* ----------------- Inline Add Hearing mini-form ----------------- */

function AddHearingInline({ matterId, onCancel, onSaved }) {
  const [form, setForm] = useState(() => ({
    id: uid("hearing"),
    matterId,
    dateTime: toLocalDatetime(new Date()),
    location: "",
    courtRoom: "",
    notes: "",
    status: "Scheduled",
    reminders: [],
  }));
  const [saving, setSaving] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="mt-3 border rounded-lg p-4 bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Date & Time">
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.dateTime}
            onChange={(e) => update("dateTime", e.target.value)}
          />
        </Field>
        <Field label="Location">
          <input
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Delhi High Court"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </Field>
        <Field label="Court Room">
          <input
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Courtroom 5"
            value={form.courtRoom}
            onChange={(e) => update("courtRoom", e.target.value)}
          />
        </Field>
        <Field label="Status">
          <select
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option>Scheduled</option>
            <option>Adjourned</option>
            <option>Heard</option>
            <option>Disposed</option>
          </select>
        </Field>
        <Field className="md:col-span-2" label="Notes">
          <textarea
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Hearing notes…"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            setSaving(true);
            try {
              // Convert datetime-local (no timezone) to ISO
              const iso = datetimeLocalToISO(form.dateTime);
              await upsertHearing({ ...form, dateTime: iso });
              await onSaved?.();
            } finally {
              setSaving(false);
            }
          }}
          disabled={saving}
        >
          {saving ? "Saving…" : "Add Hearing"}
        </Button>
      </div>
    </div>
  );
}

/* ----------------- small UI helpers ----------------- */

function Row({ label, children }) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-gray-500">{label}:</span>
      <div className="ml-2">{children}</div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function PriorityPill({ value }) {
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

/* ----------------- date helpers ----------------- */

// show nice local string from ISO
function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// datetime-local value from Date (YYYY-MM-DDTHH:mm)
function toLocalDatetime(date) {
  const pad = (n) => `${n}`.padStart(2, "0");
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

// convert datetime-local string to ISO string
function datetimeLocalToISO(dtLocal) {
  // Treat dtLocal as local time and convert to ISO with timezone
  // Example input: "2025-09-30T14:30"
  const [datePart, timePart] = (dtLocal || "").split("T");
  if (!datePart || !timePart) return new Date().toISOString();
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0);
  return dt.toISOString();
}
