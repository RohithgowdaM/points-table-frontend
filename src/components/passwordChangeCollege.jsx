import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDashboardData, fetchCollegeOptions } from '../utils/apputils';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const PasswordChangecollege = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [soption, setOption] = useState();
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData(navigate, setLoading);
    }, [navigate]);
    useEffect(() => {
        fetchCollegeOptions(setOptions, navigate);
    }, [navigate]);

    const handleOptionChange = (selectedoption) => {
        setOption(selectedoption.value);
    };

    const handlepasswordChange = (e) => {
        const password = e.target.value;
        const minlength = 8;
        const regex = /^[A-Za-z0-9@#$&]+$/;
        if (!regex.test(password)) { setError("Only letters, numbers, @, #, $, & are allowed") }
        else if (password.length < minlength) setError(`Password should be minimum ${minlength} characters`)
        else {
            setError('');
            setPassword(password);
        }
    }

    const handleshowpass = () => {
        const x = document.getElementById('password');
        if (x.type === 'password') x.type = 'text';
        else x.type = 'password'
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            alert('Please resolve the error before submitting');
            return;
        }
        else {
            const showConfirmation = () =>
                new Promise((resolve) => {
                  const userConfirmed = window.confirm("Confirm new password?");
                  resolve(userConfirmed);
                });
            try {
                const user= await showConfirmation();
                if(user){
                const response = await axios.post('http://localhost:5000/admin/change-college-password', {
                    soption: soption,
                    password: password,
                })
                alert(`Password Changed successfully`)
                navigate('/admin/dashboard');
            }
            } catch (error) {
                alert('Some error occurred');
                console.log(error)
            };
        }
    }
    if (loading) {
        return (<p>Loading</p>);
    }

    return (
        <div>
            <h1>Change Password</h1>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="college_name">College Name</label>
                <Select
                    required
                    placeholder="Select the College"
                    options={options}
                    name="college_name"
                    id="college_name"
                    onChange={handleOptionChange}
                />
                <label htmlFor="password">Password</label>
                <input type="password" required name='password' id="password" onChange={handlepasswordChange} />
                <br />
                <input type="checkbox" name="showpass" id="showpass" onClick={handleshowpass} /> Show Password
                {error && <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>}
                <br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default PasswordChangecollege;