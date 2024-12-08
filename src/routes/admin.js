import { Routes, Route } from 'react-router-dom';
import LoginAdmin from '../components/admin_login';
import AdminDashboard from '../components/admin_dashboard';
import AddCollege from '../components/add_college';
import EditCollege from '../components/editCollege';
import PasswordChangecollege from '../components/passwordChangeCollege';
import DeleteCollege from '../components/deleteCollege';
import AddSports from '../components/add_sports';
import AddTournament from '../components/addTournament';
import EditTournament from '../components/editTournament';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginAdmin />} />
      <Route path='/dashboard' element={<AdminDashboard />} />
      <Route path='/addcollege' element={<AddCollege />} />
      <Route path='/editcollege' element={<EditCollege />} />
      <Route path='/changepasswordcollege' element={<PasswordChangecollege />} />
      <Route path="/deletecollege" element={<DeleteCollege />} />
      <Route path="/addsport" element={<AddSports />} />
      <Route path="/addtournament" element={<AddTournament />} />
      <Route path="/edittournament" element={<EditTournament />} />
    </Routes>
  );
};

export default AdminRoutes;
