import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [adminID, setAdminID] = useState('');
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userID');
    setAdminID(id);

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        navigate('/admin-login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/admin/dashboard', {
          headers: { Authorization: token },
        });
        setLoading(false);
      } catch (error) {
        console.log("Message", error.response.data.error);
        if (error.response) {
          if (error.response.status === 401 && error.response.data.error === 'Token Expired') {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/admin-login');
          }
          else {
            alert('Some unknown error has been caused')
          }
        }
        navigate('/admin-login');
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3600000);
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
        <Link to=''>
          <button>Add Admin</button>
        </Link>
      </div>
      <div>
        <Link to=''>
          <button>Forgot/change Password of admins</button>
        </Link>
      </div>
      <div>
        <Link to=''>
          <button>Forgot/Change Password of College</button>
        </Link>
      </div>
      <div>
        <Link to='/admin/editcollege'>
          <button>Edit College Details</button>
        </Link>
      </div>
      <div>
        <button>Delete College</button>
      </div>
      <div>
        <button>Add Sport</button>
      </div>
      <div>
        <button>Delete Sport</button>
      </div>
      <div>
        <button>Enter Tournament Details</button>
      </div>
      <div>
        <button>Schedule Tournaments</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
