import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './components/admin_login';
import AdminDashboard from './components/admin_dashboard';
import AddCollege from './components/add_college';
import CollegeLogin from './components/college_login';
import CollegeDashboard from './components/college_dashboard';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/admin-login' element={<LoginAdmin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />  
          <Route path='/admin/addcollege' element={<AddCollege/>} />  

          <Route path="/" element={<CollegeLogin />}/>
          <Route path="/dashboard" element={<CollegeDashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
