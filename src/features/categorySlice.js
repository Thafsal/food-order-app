import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from the API
export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    selected: "All",
    loading: false,
    error: null,
  },
  reducers: {
    selectCategory(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
