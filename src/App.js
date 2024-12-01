import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './components/admin_login';
import AdminDashboard from './components/admin_dashboard';
import AddCollege from './components/add_college';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/admin-login' element={<LoginAdmin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />  
          <Route path='/admin/addcollege' element={<AddCollege/>} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
