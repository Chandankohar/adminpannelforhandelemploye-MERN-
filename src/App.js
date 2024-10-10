import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EmployDetails from './components/EmployDetails';
import IndexPage from './components/IndexPage';
import RegisterEmployForm from './components/RegisterEmployForm';
import {Slide, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<IndexPage/>} >
      <Route index element={<Dashboard/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/employedetail' element={<EmployDetails/>} />
      <Route path='/registeremploye' element={<RegisterEmployForm/>} />
      <Route path='/updateemploye/:id' element={<RegisterEmployForm/>} />
      </Route>
    </Routes>
    <ToastContainer autoClose={2000} transition={Slide} />
    </>
  );
}

export default App;
