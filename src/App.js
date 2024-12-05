import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/admin';
import CollegeRoutes from './routes/college';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<CollegeRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
