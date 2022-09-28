import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import { ToastContainer } from 'react-toastify';
import User from './components/User';
import ResetPassword from './components/ResetPassword';
import CreateResetPassword from './components/CreateResetPassword';
import InvaliLink from './components/InvaliLink';
function App() {

  return (
    <>
       <BrowserRouter>
      <ToastContainer />
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/*" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/forgetPassword/:id/:token" element={<CreateResetPassword/>} />
            <Route path="/invalidlink" element={<InvaliLink/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
