import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchEmployeeRecords } from './employeeThunks';
import { Employee } from '../../types/employee'; 

interface IUpdatePhotoResponse {
  id: number,
  filename: string
}

interface TableState {
  employees: Employee[];
  totalPages: number;
  totalEmployees: number;
  page: number;
  keyword: string;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  employees: [],
  totalPages: 0,
  totalEmployees: 0,
  page: 1,
  keyword: '',
  loading: false,
  error: null,
};
 
const employeeSearchSlice = createSlice({
  name: 'employeeSearch',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearEmployees(state) {
      state.employees = [];
      state.totalPages = 0;
      state.totalEmployees = 0;
      state.page = 0;
    },
    updateEmployeeInEmployees: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.map(emp =>
        emp.id === action.payload.id ? action.payload : emp
      );
    },
    updateEmployeePhotoInEmployees: (state, action: PayloadAction<IUpdatePhotoResponse>) => {
      state.employees = state.employees.map(emp => 
        emp.id === action.payload.id ? { ...emp, photo: action.payload.filename } : emp
      );
    },
    addEmployeeToEmployees: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployeeRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployeeRecords.fulfilled, (state, action) => {
        state.employees = action.payload.employees;
        state.totalPages = action.payload.totalPages;
        state.totalEmployees = action.payload.totalEmployees;
        state.page = action.payload.page
        state.loading = false;
      })
      .addCase(searchEmployeeRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load data';
      }) 
  },
});

export const { setSearch, setPage, clearEmployees, updateEmployeeInEmployees, addEmployeeToEmployees, updateEmployeePhotoInEmployees } = employeeSearchSlice.actions;
export default employeeSearchSlice.reducer;