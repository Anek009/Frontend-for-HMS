import Footer from './Components/Footer/Footer';

import Main from './Components/Main/Main';
import Login from './Components/pages/Login';
import AdminDashboard from './Components/pages/AdminDashboard';
import DoctorDashboard from './Components/pages/DoctorDashboard';
import PatientDashboard from './Components/pages/PatientDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/pages/Register';
function App() {
  return (
    <div className="text-[#1d4d85] app min-w-[280px] min-h-screen bg-background">
      <BrowserRouter>
        
        <main className="flex-grow">
          <Routes>
            
            <Route path="/Hospital-Website" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
