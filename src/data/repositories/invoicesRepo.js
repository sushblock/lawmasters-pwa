import { getDB } from '../db';
const STORE = 'invoices';

export async function listInvoices() {
  const db = await getDB();
  return db.getAll(STORE);
}
export async function getInvoice(id) {
  const db = await getDB();
  return db.get(STORE, id);
}
export async function upsertInvoice(invoice) {
  const db = await getDB();
  await db.put(STORE, invoice);
  return invoice;
}
export async function removeInvoice(id) {
  const db = await getDB();
  await db.delete(STORE, id);
}
export async function seedInvoices(items) {
  const db = await getDB();
  const tx = db.transaction(STORE, 'readwrite');
  for (const it of items) await tx.store.put(it);
  await tx.done;
}
