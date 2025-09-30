import { openDB } from "idb";

const DB_NAME = "lawmasters";
const DB_VERSION = 1;

export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("matters"))
        db.createObjectStore("matters", { keyPath: "id" });
      if (!db.objectStoreNames.contains("invoices"))
        db.createObjectStore("invoices", { keyPath: "id" });
      if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta"); // key -> value
    },
  });
}

export async function putAll(store, items) {
  const db = await getDB();
  const tx = db.transaction(store, "readwrite");
  for (const item of items) await tx.store.put(item);
  await tx.done;
}

export async function getAll(store) {
  const db = await getDB();
  return db.getAll(store);
}
