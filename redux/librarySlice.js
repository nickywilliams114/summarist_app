import { createSlice } from "@reduxjs/toolkit";
import {
  toLibraryBook,
  saveToLibrary,
  removeFromLibrary,
  saveFinished,
} from "@/lib/userData";

// Both maps are keyed by book id so lookups and removals are cheap.
const initialState = {
  saved: {},
  finished: {},
  loading: true,
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action) => {
      state.saved = action.payload.saved || {};
      state.finished = action.payload.finished || {};
      state.loading = false;
    },
    clearLibrary: (state) => {
      state.saved = {};
      state.finished = {};
      state.loading = false;
    },
    addSaved: (state, action) => {
      state.saved[action.payload.id] = action.payload;
    },
    removeSaved: (state, action) => {
      delete state.saved[action.payload];
    },
    addFinished: (state, action) => {
      state.finished[action.payload.id] = action.payload;
    },
  },
});

export const { setLibrary, clearLibrary, addSaved, removeSaved, addFinished } =
  librarySlice.actions;

// Updates the store right away, then persists. Rolls back if Firestore fails.
export const toggleSaved = (book) => async (dispatch, getState) => {
  const { user } = getState().user;
  if (!user) return;
  const isSaved = Boolean(getState().library.saved[book.id]);
  const libraryBook = toLibraryBook(book);
  dispatch(isSaved ? removeSaved(book.id) : addSaved(libraryBook));
  try {
    if (isSaved) {
      await removeFromLibrary(user.uid, book.id);
    } else {
      await saveToLibrary(user.uid, book);
    }
  } catch (error) {
    console.error(error);
    dispatch(isSaved ? addSaved(libraryBook) : removeSaved(book.id));
  }
};

export const markFinished = (book) => async (dispatch, getState) => {
  const { user } = getState().user;
  if (!user || getState().library.finished[book.id]) return;
  dispatch(addFinished(toLibraryBook(book)));
  try {
    await saveFinished(user.uid, book);
  } catch (error) {
    console.error(error);
  }
};

export default librarySlice.reducer;
