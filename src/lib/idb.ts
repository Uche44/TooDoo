import { openDB } from "idb";

export const db = await openDB("notesApp", 1, {
  upgrade(db) {
    db.createObjectStore("user");
    db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
  },
});
