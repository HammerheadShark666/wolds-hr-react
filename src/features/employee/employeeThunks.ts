import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import axios from '../../api/axiosInstance'; 
import { updateEmployeeInEmployees, addEmployeeToEmployees, updateEmployeePhotoInEmployees } from '../employee/employeeListSlice'
 
type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}
 
export const searchEmployeeRecords = createAsyncThunk<ApiEmployeePagingResponse, { keyword: string; page: number, pageSize: number }>
  ('search/searchRecords', async ({ keyword, page, pageSize }) => {
    const response = await axios.get(`/employees/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
  return response.data;
})
   
export const addEmployee = createAsyncThunk('employee/addEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try     
    {      
      const response = await axios.post( '/employees/add', employee);
      dispatch(addEmployeeToEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return rejectWithValue(error.response.data.errors || error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk('employee/updateEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try 
    {      
      const response = await axios.put( '/employees/update', employee);
      dispatch(updateEmployeeInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return rejectWithValue(error.response.data.errors || error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee',
  async (employeeId: number, { rejectWithValue }) => {

    try {          
      const response = await axios.delete('/employees/' + employeeId);      
      return response.data; 
    } 
    catch (error: any) 
    { 
      return rejectWithValue(error.response.data.errors || error.message);
    }
  }
);  

export const updateEmployeePhoto = createAsyncThunk('employee/updateEmployeePhoto',
  async ({ id, file }: { id: number; file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {     
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`/employees/upload-photo/${id}`, formData, {
        headers: {
          'Content-Type': undefined
        }
      }); 

      dispatch(updateEmployeePhotoInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return rejectWithValue(error.response.data.errors || error.message);
    }
  }
);
