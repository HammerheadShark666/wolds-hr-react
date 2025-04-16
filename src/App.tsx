import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "./app/store";
import Layout from "./layouts/Layout";
import Employees from './features/employee/pages/Employees';
import Employment from "./features/employment/pages/Employment";
import Home from "./features/home/pages/Home"; 
import Jobs from './features/job/pages/Jobs';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/employees" element={<Employees />} /> 
          <Route path="/employment" element={<Employment />} /> 
          <Route path="/jobs" element={<Jobs />} /> 
        </Routes>
        </Provider>
      </Layout>
  </BrowserRouter>
  );
}

export default App;