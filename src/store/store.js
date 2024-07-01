import { configureStore } from "@reduxjs/toolkit";

import propertyReducer from "../slices/propertySlice";

const store = configureStore({
    reducer :{
        property : propertyReducer,
    }
});


export default store;