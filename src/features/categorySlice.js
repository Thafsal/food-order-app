import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await res.json();
  return data.categories || [];
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    selected: "All",
    loading: false,
  },
  reducers: {
    selectCategory: (state, action) => {
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
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
