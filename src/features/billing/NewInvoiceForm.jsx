// src/features/billing/NewInvoiceForm.jsx
import { useState } from "react";
import Modal from "../../components/common/Modal"; // or wherever your Modal lives
import Button from "../../components/common/Button"; // your existing Button

export default function NewInvoiceForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    id: `INV-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 900 + 100
    )}`,
    client: "",
    amount: 0,
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
  });

  return (
    <Modal isOpen={true} onClose={onClose} title="New Invoice">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice ID</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.id}
            onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.client}
            onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: Number(e.target.value || 0) }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value }))
              }
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onSave?.(form)}>
            Create Invoice
          </Button>
        </div>
      </div>
    </Modal>
  );
}
