'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../../../app/store';
import EmployeesImportToolBar from './EmployeesImportToolBar';
import { clearImportedEmployees, setImportSearchPage, setImportSearchDate } from '../../employeeImportSlice';
import { searchImportedEmployees } from '../../employeeThunks';  
import ErrorToast from '../../../../components/ErrorToasts';
import Pagination from '../../../../components/Pagination';
import EmployeesTable from '../../../../components/EmployeesTable';

const EmployeesImportContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employeesImported, totalPages, totalImportedEmployees, page, loading, importDate, error } = useSelector((state: RootState) => state.employeeImport);
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
 
  const handleSearch = (importDate: string) => { 
   if(importDate !== null) {
      dispatch(setImportSearchDate(importDate));
      dispatch(searchImportedEmployees({ page: 1, importDate: importDate, pageSize: pageSize }));
    } else {
      dispatch(clearImportedEmployees());
    }
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setImportSearchPage(pageNumber));
    if(importDate !== null) {
      dispatch(searchImportedEmployees({ page: pageNumber, importDate: importDate, pageSize: pageSize }));
    }
  };

  return (
    <div className="p-4">
      <ErrorToast error={error} /> 
      <EmployeesImportToolBar onSearch={handleSearch} setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
      {loading ? 
        <p>Loading...</p> : 
        <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={employeesImported} />}
      <Pagination totalPages={totalPages} totalRecords={totalImportedEmployees} currentPage={page} onPageChange={handlePageChange} title={"Employees"} />
    </div>
  );
};

export default EmployeesImportContainer;