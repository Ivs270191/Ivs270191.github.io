import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceStateType {
  selectedCategory: number;
  selectedType: string;
  searchInput: string;
}

const initialState: FilterSliceStateType = {
  selectedCategory: 0,
  selectedType: "rating",
  searchInput: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setSelectedCategory, setSelectedType, setSearchInput } =
  filterSlice.actions;

export default filterSlice.reducer;
