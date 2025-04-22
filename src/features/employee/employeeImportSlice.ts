import { createSlice } from '@reduxjs/toolkit';
import { importEmployees } from './employeeThunks';
import { Employee } from '../../types/employee'; 
 
interface EmployeeImportState {
  existingEmployees: Employee[];
  employeesImported: Employee[];
  employeesErrorImporting: string[]; 
  loading: boolean;
  error: string | null;
} 

const initialState: EmployeeImportState = {
  existingEmployees: [],
  employeesImported: [],
  employeesErrorImporting: [],
  loading: false,
  error: null,
};
 
const employeeImportSlice = createSlice({
  name: 'employeeImportSlice',
  initialState,
  reducers: { 
    clearState: (state) =>  {
      state.existingEmployees = [];
      state.employeesImported = [];
      state.employeesErrorImporting = [];
      state.loading = false;
      state.error = null;
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(importEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importEmployees.fulfilled, (state, action) => {
        state.existingEmployees = action.payload.existingEmployees;
        state.employeesImported = action.payload.employeesImported;
        state.employeesErrorImporting = action.payload.employeesErrorImporting; 
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to import employees';
      })  
  },
});

export const { clearState } = employeeImportSlice.actions
export default employeeImportSlice.reducer;