import { createSlice } from "@reduxjs/toolkit";

// Default state value initialized.
const initialState = {
    properties: []
};

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setProperty: (state, action) => {
            state.properties = action.payload;
        }
    }
});

export const { setProperty } = propertySlice.actions;
export default propertySlice.reducer;
