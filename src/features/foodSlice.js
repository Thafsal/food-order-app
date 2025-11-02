import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchAllFoods = createAsyncThunk("foods/fetchAll", async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  const data = await res.json();
  return data.meals || [];
});

export const fetchFoodsByCategory = createAsyncThunk(
  "foods/fetchByCategory",
  async (category) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await res.json();
    return data.meals || [];
  }
);

const foodSlice = createSlice({
  name: "foods",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFoodsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFoodsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
