import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../utils/apputils";

const AdminDashboard = () => {
  const [adminID, setAdminID] = useState('');
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userID');
    setAdminID(id);

    fetchDashboardData(navigate, setLoading);

    const interval = setInterval(() => {
      fetchDashboardData(navigate, setLoading);
    }, 3600000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin ID: {adminID}</h1>
      <div>
        <Link to='/admin/addcollege'>
          <button>Add College</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/changepasswordcollege'>
          <button>Forgot/Change Password of College</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/editcollege'>
          <button>Edit College Details</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/deletecollege'>
          <button>Delete College</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/addsport'>
          <button>Add Sport</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/addtournament'>
          <button>Schedule Tournaments</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/edittournament'>
          <button>Edit Tournament Details</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/entertournamentdetails'>
          <button>Enter Tournament Details</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
