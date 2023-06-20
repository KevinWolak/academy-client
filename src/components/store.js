import { configureStore } from "@reduxjs/toolkit";
import academySlice from "./AcademySlice";

const store = configureStore({
  reducer: {
    academySlice,
  },
});

export default store;
