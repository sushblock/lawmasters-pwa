// src/features/hearings/AddHearingForm.jsx
import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

export default function AddHearingForm({ matterId, onClose, onSave }) {
  const [form, setForm] = useState({
    id: `hearing_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`,
    matterId,
    dateTime: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
    location: "",
    courtRoom: "",
    notes: "",
    status: "Scheduled",
    reminders: [],
  });

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Hearing">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={form.dateTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, dateTime: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Court Room</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.courtRoom}
              onChange={(e) =>
                setForm((f) => ({ ...f, courtRoom: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onSave?.(form)}>
            Add Hearing
          </Button>
        </div>
      </div>
    </Modal>
  );
}
