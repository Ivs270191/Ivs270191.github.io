import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://67222c072108960b9cc3333a.mockapi.io/";

export const fetchPizzas = createAsyncThunk<PizzaItemType[], string>(
  "pizza/fetchPizzas",
  async (url) => {
    const { data } = await axios.get<PizzaItemType[]>(url);
    return data;
  }
);

export type PizzaItemType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};
enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceStateInterface {
  items: PizzaItemType[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
}

const initialState: PizzaSliceStateInterface = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    // setItems(state, action) { state.items = action.payload }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

// export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
