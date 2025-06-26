import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/colors";

export const fetchColors = createAsyncThunk(
  "color/fetchAll",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { color } = getState();
      return color.Colors.length === 0;
    },
  }
);

const colorSlice = createSlice({
  name: "color",
  initialState: {
    Colors: [],
    loadingColor: false,
    errorColor: null,
  },
  reducers: {
    clearColors: (state) => {
      state.Colors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loadingColor = true;
        state.errorColor = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loadingColor = false;
        state.Colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loadingColor = false;
        state.errorColor = action.errorColor.message;
      });
  },
});

export const { clearColors } = colorSlice.actions;
export default colorSlice.reducer;
