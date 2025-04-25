import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "./app/store";
import Layout from "./layouts/Layout";
import Employees from './features/employee/pages/Employees';
import Employment from "./features/employment/pages/Employment";
import Home from "./features/home/pages/Home"; 
import Jobs from './features/job/pages/Jobs';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeesImport from './features/employee/pages/EmployeesImport';

function App() {
  return (
    <GlobalErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/employees" element={<Employees />} /> 
            <Route path="/employees-import" element={<EmployeesImport />} /> 
            <Route path="/employment" element={<Employment />} /> 
            <Route path="/jobs" element={<Jobs />} /> 
          </Routes>
          </Provider>
          <ToastContainer></ToastContainer>
        </Layout>
      </BrowserRouter>
    </GlobalErrorBoundary>
  );
}

export default App;