import { getDB } from "../db";
import { normalizeMatter } from "../../models/factories";

const STORE = "matters";

export async function listMatters() {
  const db = await getDB();
  return db.getAll(STORE);
}

export async function getMatter(id) {
  const db = await getDB();
  return db.get(STORE, id);
}

export async function upsertMatter(matter) {
  const db = await getDB();
  const clean = normalizeMatter(matter);
  await db.put(STORE, clean);
  return clean;
}

export async function removeMatter(id) {
  const db = await getDB();
  await db.delete(STORE, id);
}

// IMPORTANT: seed writes raw items as-is so your original dummy data stays exact
export async function seedMatters(items) {
  const db = await getDB();
  const tx = db.transaction(STORE, 'readwrite');
  for (const it of items) await tx.store.put(it); // <-- no normalize here
  await tx.done;
}
