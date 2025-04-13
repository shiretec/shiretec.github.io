import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "@/widgets/clicks-counter/modal/api/fetch-count.ts";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const fetchCountThunk = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number): Promise<number> => {
    return await fetchCount(amount);
  },
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value -= 1;
    },
    decrement: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountThunk.pending, (state) => {
      state.status = "loading";
    });
    // .addCase(fetchCountThunk.ful, (state) => {
    //   state.status = "idle";
    //   state.value;
    // });
  },
  selectors: {
    selectCount: (counter: CounterState) => counter.value,
    selectStatus: (counter: CounterState) => counter.status,
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
