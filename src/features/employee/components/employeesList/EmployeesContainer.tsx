'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from './ToolBar';
import Pagination from './Pagination'; 
import { AppDispatch, RootState } from '../../../../app/store';
import { clearEmployees, setPage, setSearch } from '../../employeeListSlice';
import { searchEmployeeRecords } from '../../employeeThunks'; 
import EmployeesTable from './EmployeesTable';

const EmployeesContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employees, totalPages, totalEmployees, page, loading, keyword } = useSelector((state: RootState) => state.employeeList);
  const [showEmployeePopForm, setShowEmployeePopForm] = useState(false);
 
  const handleSearch = (keyword: string) => { 
   if(keyword !== '') {
      dispatch(setSearch(keyword));
      dispatch(searchEmployeeRecords({ page: 1, keyword: keyword, pageSize: pageSize }));
    } else {
      dispatch(clearEmployees());
    }
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
    dispatch(searchEmployeeRecords({ page: pageNumber, keyword: keyword, pageSize: pageSize }));
  };

  return (
    <div className="p-4">
      <ToolBar onSearch={handleSearch} setShowEmployeePopForm={setShowEmployeePopForm} showEmployeePopForm={showEmployeePopForm} />
      {loading ? <p>Loading...</p> : <EmployeesTable setShowEmployeePopForm={setShowEmployeePopForm} showEmployeePopForm={showEmployeePopForm} rows={employees} />}
      <Pagination totalPages={totalPages} totalEmployees={totalEmployees} currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
};

export default EmployeesContainer;