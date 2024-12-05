import React, { useState, useEffect } from "react";
import { fetchDashboardData, fetchCollegeOptions } from '../utils/apputils';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";

const DeleteCollege = () => {
    const [options, setOptions] = useState([]);
    const [soption, setOption] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchDashboardData(navigate, setLoading);
    }, [navigate]);
    useEffect(() => {
        fetchCollegeOptions(setOptions, navigate);
    }, [navigate]);

    const handleOptionChange = (selectedoption) => {
        setOption(selectedoption.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const showConfirmation = () =>
          new Promise((resolve) => {
            const userConfirmed = window.confirm("Are you sure want to delete the college?");
            resolve(userConfirmed);
          });
      
        try {
          const userResponse = await showConfirmation();
      
          if (userResponse) {
            const response = await axios.post('http://localhost:5000/admin/delete-college', { soption });
            alert('College Deleted Successfully');
          } else {
            alert('Action Cancelled');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert('College Not found');
            navigate('/admin/deletecollege');
          } else {
            console.error(error);
            alert('Some error occurred');
            navigate('/admin/dashboard');
          }
        }
      };      

    if (loading) {
        return <p>Loading...</p>
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Select
                    required
                    options={options}
                    placeholder="Select the college"
                    name="college_name"
                    id="college_name"
                    onChange={handleOptionChange}
                />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}
export default DeleteCollege; 