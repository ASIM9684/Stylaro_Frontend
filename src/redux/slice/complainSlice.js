import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "../../model/Model";

const API_URL = "http://localhost:8000/complain";

export const fetchcomplains = createAsyncThunk(
  "complain/fetchAll",
  async (id = null, { rejectWithValue }) => {
    try {
      const endpoint = id ? "http://localhost:8000/getComplainsbyUser" : API_URL;
      const response =  await axios.get(endpoint, {
            headers: getAuthHeader(),
          })
      return {
        data: response.data,
        fetchedById: Boolean(id),
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return rejectWithValue(message);
    }
  },
  {
    condition: (id, { getState }) => {
      const { complain } = getState();

      if (complain.complain.length > 0) {
        return false;
      }

      return true;
    },
  }
);

const complainSlice = createSlice({
  name: "complain",
  initialState: {
    complain: [],
    loadingcomplain: false,
    errorcomplain: null,
    fetchedById: false,
  },
  reducers: {
    clearcomplains: (state) => {
      state.complain = [];
      state.fetchedById = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcomplains.pending, (state) => {
        state.loadingcomplain = true;
        state.errorcomplain = null;
        state.fetchedById = false;
      })
      .addCase(fetchcomplains.fulfilled, (state, action) => {
        state.loadingcomplain = false;
        state.complain = action.payload.data;
        state.fetchedById = action.payload.fetchedById;
      })
      .addCase(fetchcomplains.rejected, (state, action) => {
        state.loadingcomplain = false;
        state.errorcomplain = action.payload || action.error.message;
        state.fetchedById = false;
      });
  },
});

export const { clearcomplains } = complainSlice.actions;
export default complainSlice.reducer;
