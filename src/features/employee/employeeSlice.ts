import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { Employee } from '../../types/employee';
import { addEmployee, deleteEmployee, updateEmployee } from './employeeThunks';
 
// Define the initial state using that type
interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
}

// Initial state of the slice
const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  validationErrors: null
};
 
// Create the employee slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: { 
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => { 
      state.selectedEmployee = action.payload;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder     
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
        state.selectedEmployee = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = (action.payload as string[]) || ['Failed to add employee'];
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;  
        state.selectedEmployee = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = (action.payload as string[]) || ['Failed to update employee'];
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((t) => t.id !== action.payload);
        state.selectedEmployee = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = (action.payload as string[]) || ['Failed to delete employee'];     
      });
  }
});

export const { setSelectedEmployee, clearValidationErrors } = employeeSlice.actions;
export default employeeSlice.reducer;