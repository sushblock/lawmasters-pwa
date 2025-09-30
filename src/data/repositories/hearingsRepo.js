import { getDB } from "../db";
const STORE = "hearings";

export async function listHearings() {
  const db = await getDB();
  return db.getAll(STORE);
}
export async function listHearingsByMatter(matterId) {
  const all = await listHearings();
  return all.filter((h) => h.matterId === matterId);
}
export async function getHearing(id) {
  const db = await getDB();
  return db.get(STORE, id);
}
export async function upsertHearing(hearing) {
  const db = await getDB();
  await db.put(STORE, hearing);
  return hearing;
}
export async function removeHearing(id) {
  const db = await getDB();
  await db.delete(STORE, id);
}
export async function seedHearings(items) {
  const db = await getDB();
  const tx = db.transaction(STORE, "readwrite");
  for (const it of items) await tx.store.put(it);
  await tx.done;
}
