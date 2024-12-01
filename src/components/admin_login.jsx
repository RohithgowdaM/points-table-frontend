import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setformData] = useState({
        adminID: '',
        password: ''
    });
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const validatePassword = (password) => {
        const regex = /^[A-Za-z0-9#&@]*$/;
        const minLength = 8;
        if (!regex.test(password)) {
            return "Only letters, numbers, @, #, & are allowed";
        } else if (password.length < minLength) {
            return `Password must be at least ${minLength} characters.`;
        }
        return;
    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            const vError = validatePassword(value)
            setError(vError);
        }
        setformData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const vError = validatePassword(formData.password);
        if (vError) { setError(vError); }
        else {
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            try {
                const response = await axios.post('http://localhost:5000/admin/login', formData);
                localStorage.setItem('userID',formData.adminID);
                localStorage.setItem('token',response.data.token);
                alert('Login successfully');
                navigate('/admin/dashboard')
            } catch (error) {
                if (error.status === 401) { alert("Invalid credentials") }
                else {
                    console.log('Error:', error);
                    alert('An error occured while submitted the form')
                }
            }
            submitButton.disabled = false;
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='adminID'>Login ID</label>
                <input type='text' id='adminID' name='adminID' value={formData.adminID} onChange={handlechange} pattern="^[A-Za-z0-9]+$" required />
                <br />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handlechange} required />
                <br />
                {error && <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>}
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
export default Login;