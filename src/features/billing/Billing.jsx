import { Plus, TrendingUp } from "lucide-react";
import { Button, StatCard } from "../../components/common";

function BillingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Monthly Revenue"
        value="₹4.2L"
        color="from-green-500 to-emerald-500"
        icon={TrendingUp}
      />
      <StatCard
        label="Outstanding"
        value="₹1.8L"
        color="from-yellow-500 to-orange-500"
        icon={TrendingUp}
      />
      <StatCard
        label="Overdue"
        value="₹50K"
        color="from-red-500 to-pink-500"
        icon={TrendingUp}
      />
    </div>
  );
}

function InvoicesTable({ invoices }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-gray-50 transition-all">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">{inv.id}</p>
                <p className="text-xs text-gray-500">{inv.date}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900">{inv.client}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">
                  ₹{inv.amount.toLocaleString()}
                </p>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    inv.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : inv.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Billing({ invoices, onNewInvoice }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Billing</h2>
        <Button variant="success" onClick={onNewInvoice}>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>
      <BillingStats />
      <InvoicesTable invoices={invoices} />
    </div>
  );
}
