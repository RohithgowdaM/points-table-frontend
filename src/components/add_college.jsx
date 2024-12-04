import axios from 'axios';
import '../styles/add_college.css'
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { indoorGamesList, outdoorGamesList, zone } from '../data/getOptions';

const AddCollege = () => {
    const [indoorGames, setIndoorGames] = useState([]);
    const [outdoorGames, setOutdoorGames] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [error2, setError2] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState({
        college_id: 0,
        college_name: '',
        college_address: '',
        name_of_the_zone: '',
        principle_name: '',
        principle_contact_number: '',
        total_strength_i: 0,
        total_strength_ii: 0,
        total_strength_iii: 0,
        total_strength_iv: 0,
        total_strength_pg: 0,
        ped_name:"",
        ped_qualification:"",
        ped_years_of_service:0,
        ped_years_of_service_in_institute:0,
        ped_contact:"",
        ped_awards:"",
        sports_dev_fees: 0,
        password: '',
        sports_facilities: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                navigate('/admin-login');
                return;
            }

            try {
                console.log("Fetching dashboard data...");
                const response = await axios.get('http://localhost:5000/admin/dashboard', {
                    headers: { Authorization: token },
                });
                setLoading(false); // Stop loading after the API call completes
            } catch (error) {
                console.log("Message", error);
                if (error.response) {
                    if (error.response.status === 401 && error.response.data.error === 'Token expired') {
                        alert('Session expired. Please log in again.');
                        localStorage.removeItem('token');
                        navigate('/admin-login');
                    }
                    else {
                        alert('Some unknown error has been caused')
                    }
                }
                navigate('/admin-login');
                setLoading(false); // Stop loading after error handling
            }
        };

        fetchData();

        // Set interval to fetch data every hour (60 minutes = 3600000 ms)
        const interval = setInterval(fetchData, 3600000);
        return () => clearInterval(interval);
    }, [navigate]);

    const handleIndoorChange = (selectedOptions) => {
        setIndoorGames(selectedOptions.map((option) => option.value));
    }

    const handleOutdoorChange = (selectedOptions) => {
        setOutdoorGames(selectedOptions.map((option) => option.value));
    }
    const handleZoneChange = (selectedOption) => {
        formData.name_of_the_zone = selectedOption.value;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value,
        });
    }
    const handlepasswordChange = (e) => {
        const password = e.target.value;
        const minlength = 8;
        const regex = /^[A-Za-z0-9@#$&]+$/;
        if (!regex.test(password)) { setError("Only letters, numbers, @, #, $, & are allowed") }
        else if (password.length < minlength) setError(`Password should be minimum ${minlength} characters`)
        else {
            setError('');
            setformData({
                ...formData,
                password: password,
            })
        }
    }
    const handleconfirmpassword = (e) => {
        const password = e.target.value;
        if (password === formData.password) { setError2('') }
        else { setError2('Password is not matching') }
    }
    const handleshowpass = () => {
        const x = document.getElementById('password');
        if (x.type === 'password') x.type = 'text';
        else x.type = 'password'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || error2) alert('Please resolve the error to continue');
        else {
            formData.sports_facilities = { indoorGames, outdoorGames };
            try {
                const response = await axios.post('http://localhost:5000/admin/create-college', formData);
                alert('College registered successfully')
                navigate('/admin/dashboard')
            } catch (err) {
                if (err.status === 409) { alert(err.response.data.error); }
                console.log(err.response.data.error);
            }
        }
    }
    if (loading) {
        return (<div>loading.....</div>)
    }
    return (
        <div className="form-container">
            <h1>Enter the College Details</h1>
            <form className="college-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="college_id">College ID</label>
                    <input type="number" name="college_id" id="college_id" required min='1' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="college_name">College Name</label>
                    <input type="text" name="college_name" id="college_name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="college_address">College Address</label>
                    <input type="text" name="college_address" id="college_address" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name_of_the_zone">Name Of The Zone</label>
                    <Select
                        required
                        options={zone}
                        name='name_of_the_zone'
                        onChange={handleZoneChange}
                        id="name_of_the_zone"
                        placeholder="Select the zone"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="principle_name">Principle Name</label>
                    <input type="text" name="principle_name" id="principle_name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="principle_contact_number">Principle Contact Number</label>
                    <input type="text" name="principle_contact_number" id="principle_contact_number" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_name">Physical Education Director Name</label>
                    <input type="text" name="ped_name" id="ped_name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_qualification">Physical Education Director Qualification</label>
                    <input type="text" name="ped_qualification" id="ped_qualification" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_years_of_service">PED total service years</label>
                    <input type="number" name="ped_years_of_service" id="ped_years_of_service" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_years_of_service_in_institute">PED total serviceyears in instituition</label>
                    <input type="number" name="ped_years_of_service_in_institute" id="ped_years_of_service_in_institute" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_contact">PED Contact</label>
                    <input type="Text" name="ped_contact" id="ped_contact" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ped_awards">PED Awards</label>
                    <input type="Text" name="ped_awards" id="ped_awards" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sports_facilities">Sports Facilities</label>
                    <div className='sports-section'>
                        <div className='sports-category'>
                            <h3>Indoor Games</h3>
                            <Select
                                required
                                isMulti
                                options={indoorGamesList}
                                onChange={handleIndoorChange}
                                placeholder="Select the indoor games"
                                value={indoorGamesList.filter((game) => indoorGames.includes(game.value))}
                            />
                        </div>
                        <div className='sports-category'>
                            <h3>Outdoor Games</h3>
                            <Select
                                required
                                isMulti
                                options={outdoorGamesList}
                                onChange={handleOutdoorChange}
                                placeholder="Select the outdoor games"
                                value={outdoorGamesList.filter((game) => outdoorGames.includes(game.value))}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="total_strength_i">1st Year Strength</label>
                    <input type="number" name="total_strength_i" id="total_strength_i" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="total_strength_ii">2nd Year Strength</label>
                    <input type="number" name="total_strength_ii" id="total_strength_ii" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="total_strength_iii">3rd Year Strength</label>
                    <input type="number" name="total_strength_iii" id="total_strength_iii" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="total_strength_iv">4th Year Strength</label>
                    <input type="number" name="total_strength_iv" id="total_strength_iv" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="total_strength_pg">PG Strength</label>
                    <input type="number" name="total_strength_pg" id="total_strength_pg" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sports_dev_fees">Sports Development Fees <span>&#8377;</span></label>
                    <input type="number" name="sports_dev_fees" id="sports_dev_fees" required min='0' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type="password" name="password" id="password" required onChange={handlepasswordChange} />
                        <input type="checkbox" name="showpass" id="showpass" onClick={handleshowpass} /> Show Password
                        {error && <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" required onChange={handleconfirmpassword} />
                    {error2 && <p style={{ color: "red", fontSize: "0.9em" }}>{error2}</p>}
                </div>
                <div className="form-group submit-group">
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddCollege;
