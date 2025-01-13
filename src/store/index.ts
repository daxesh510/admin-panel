import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import projectsReducer from "./projectsSlice";
import estimatesReducer from "./estimatesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    projects: projectsReducer,
    estimates: estimatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
