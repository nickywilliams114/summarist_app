import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/firebase";

// Each user has one document at users/{uid}:
// { plan, library: { [bookId]: book }, finished: { [bookId]: book } }

function userDoc(uid) {
  return doc(db, "users", uid);
}

// Only the fields needed to render a book card are stored.
export function toLibraryBook(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    subTitle: book.subTitle,
    imageLink: book.imageLink,
    audioLink: book.audioLink,
    averageRating: book.averageRating,
    subscriptionRequired: book.subscriptionRequired,
  };
}

export async function getUserData(uid) {
  const snapshot = await getDoc(userDoc(uid));
  const data = snapshot.exists() ? snapshot.data() : {};
  return {
    plan: data.plan || "basic",
    saved: data.library || {},
    finished: data.finished || {},
  };
}

export async function savePlan(uid, plan) {
  await setDoc(userDoc(uid), { plan }, { merge: true });
}

export async function saveToLibrary(uid, book) {
  await setDoc(
    userDoc(uid),
    { library: { [book.id]: toLibraryBook(book) } },
    { merge: true },
  );
}

export async function removeFromLibrary(uid, bookId) {
  await updateDoc(userDoc(uid), { [`library.${bookId}`]: deleteField() });
}

export async function saveFinished(uid, book) {
  await setDoc(
    userDoc(uid),
    { finished: { [book.id]: toLibraryBook(book) } },
    { merge: true },
  );
}
