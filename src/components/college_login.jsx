import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const CollegeLogin = () => {
    const [options, setOptions] = useState([]);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [soption, setOption] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/college/college_list');
                const tranformedoptions = response.data.college.map(college => ({
                    label: college,
                    value: college,
                }))
                setOptions(tranformedoptions)
            } catch (error) {
                console.log(error);
                alert('Some unknown error occured')
            };
        }
        fetchOptions();
    }, []);

    const Showpass = () => {
        const x = document.getElementById('password');
        if (x.type === 'password') x.type = 'text';
        else x.type = 'password';
    }
    const handlePassword = (e) => {
        const password = e.target.value;
        const regex = /^[A-Za-z0-9@#$&]+$/;
        if (password.length < 8) setError('Password must be of length 8 ');
        else if (!regex.test(password)) setError('Only letters, numbers, @, #, $, & are allowed');
        else {
            setError('');
            setPassword(password);
        }
    }

    const handleOptionChange = (selectedoption) => {
        setOption(selectedoption.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || error) {
            alert('Form contains error');
        }
        else {
            try {
                const response = await axios.post('http://localhost:5000/college/login', {
                    soption: soption,
                    password, password,
                })
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userID', response.data.id);
                navigate('/dashboard')
            } catch (error) {
                if (error.status === 404)
                    alert('User Not Found');
                else if (error.status === 401) {
                    alert('Invalid Password')
                    document.getElementById('password').value = '';
                }
                else
                    console.log(error);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="college_name">College Name</label>
                <Select
                    required
                    placeholder="Select the College"
                    options={options}
                    name="college_name"
                    id="college_name"
                    onChange={handleOptionChange}
                />
                <label htmlFor="password"> Password</label>
                <input type="password" name="password" id="password" onChange={handlePassword} required />
                <br />
                <input type="checkbox" name="show_pass" id="show_pass" onClick={Showpass} />
                <label htmlFor="show_pass">Show Password</label>
                {error && <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>}
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
}

export default CollegeLogin;