import { Routes, Route } from 'react-router-dom';
import CollegeLogin from '../components/college_login';
import CollegeDashboard from '../components/college_dashboard';

const CollegeRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<CollegeLogin />} />
                <Route path="/dashboard" element={<CollegeDashboard />} />
            </Routes>
        </div>
    );
}
export default CollegeRoutes;