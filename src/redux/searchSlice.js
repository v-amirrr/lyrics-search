import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInputText: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            return { ...state, searchInputText: action.payload };
        },
    },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;