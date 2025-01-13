import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEstimates as fetchEstimatesAPI,
  createEstimate as createEstimateAPI,
  updateEstimate as updateEstimateAPI,
} from "../services/apiServices";
import { Estimate } from "../types/estimates";

export const fetchEstimates = createAsyncThunk("estimates/fetchEstimates", async () => {
  const response = await fetchEstimatesAPI();
  return response;
});

export const createEstimate = createAsyncThunk("estimates/createEstimate", async (estimate: Estimate) => {
  const response = await createEstimateAPI(estimate);
  return response;
});

export const updateEstimate = createAsyncThunk(
  "estimates/updateEstimate",
  async ({ id, data }: { id: string; data: Estimate }) => {
    const response = await updateEstimateAPI(id, data);
    return response;
  }
);

const estimatesSlice = createSlice({
  name: "estimatesCrud",
  initialState: {
    estimates: [] as Estimate[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.loading = false;
        state.estimates = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch estimates";
      })
      .addCase(createEstimate.fulfilled, (state, action) => {
        state.estimates.push(action.payload);
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        const index = state.estimates.findIndex((estimate) => estimate.id === action.payload.id);
        if (index !== -1) {
          state.estimates[index] = action.payload;
        }
      });
  },
});

export default estimatesSlice.reducer;
