import employeeReducer from '../features/employee/employeeSlice';
import employeeListReducer from '../features/employee/employeeListSlice';
import departmentReducer from '../features/department/departmentSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employeeList: employeeListReducer,
    department: departmentReducer
  },
  devTools: process.env.NODE_ENV !== 'production',  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;