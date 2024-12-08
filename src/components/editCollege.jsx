import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { indoorGamesList, outdoorGamesList, zone } from '../data/getOptions';
import '../styles/editCollege.css';
import { fetchDashboardData, fetchCollegeOptions } from '../utils/apputils';
import showConfirmation from "../utils/showConfirmation";

const EditCollege = () => {
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [soption, setOption] = useState();
    const [collegeDetails, setCollegeDetails] = useState(null);

    useEffect(() => {
        fetchDashboardData(navigate, setLoading);

        const interval = setInterval(() => {
            fetchDashboardData(navigate, setLoading);
        }, 3600000);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        fetchCollegeOptions(setOptions, navigate);
    }, [navigate]);

    const handleOptionChange = (selectedOption) => {
        setOption(selectedOption.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/get-college', { soption });
            setCollegeDetails(response.data.college_details);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditedSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await showConfirmation('Are you sure want to submit the edited changes?');
            if (user) {
                const response = await axios.put('http://localhost:5000/admin/edit-college', collegeDetails);
                alert(response.data)
                navigate('/admin/dashboard')
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollegeDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOptions, field) => {
        setCollegeDetails((prevDetails) => ({
            ...prevDetails,
            sports_facilities: {
                ...prevDetails.sports_facilities,
                [field]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
            },
        }));
    };

    if (loading) {
        return (<p>Loading.......</p>);
    }

    return (
        <div className="edit-college-form">
            <div>
                {(
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
                        <button type="submit">Select</button>
                    </form>
                )}
            </div><div> {collegeDetails && (
                <form onSubmit={handleEditedSubmit}>
                    <h2>Edit College Details</h2>

                    <div className="form-row">
                        <div className="form-column">
                            <label>College Name:</label>
                            <input
                                type="text"
                                name="college_name"
                                value={collegeDetails.college_name}
                                onChange={handleChange}
                                required
                            />

                            <label>College Address:</label>
                            <input
                                type="text"
                                name="college_address"
                                value={collegeDetails.college_address}
                                onChange={handleChange}
                                required
                            />

                            <label>Principle Name:</label>
                            <input
                                type="text"
                                name="principle_name"
                                value={collegeDetails.principle_name}
                                onChange={handleChange}
                                required
                            />

                            <label>Principle Contact Number:</label>
                            <input
                                type="text"
                                name="principle_contact_number"
                                value={collegeDetails.principle_contact_number}
                                onChange={handleChange}
                                required
                            />

                            <label>PED Name:</label>
                            <input
                                type="text"
                                name="ped_name"
                                value={collegeDetails.ped_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-column">
                            <label>PED Contact:</label>
                            <input
                                type="text"
                                name="ped_contact"
                                value={collegeDetails.ped_contact}
                                onChange={handleChange}
                                required
                            />

                            <label>PED Awards:</label>
                            <input
                                type="text"
                                name="ped_awards"
                                value={collegeDetails.ped_awards}
                                onChange={handleChange}
                                required
                            />

                            <label>PED Total Years of Service:</label>
                            <input
                                type="number"
                                name="ped_years_of_service"
                                value={collegeDetails.ped_years_of_service}
                                onChange={handleChange}
                                required
                            />

                            <label>PED Service Years in Institute:</label>
                            <input
                                type="number"
                                name="ped_years_of_service_in_institute"
                                value={collegeDetails.ped_years_of_service_in_institute}
                                onChange={handleChange}
                                required
                            />

                            <label>Sports Development Fees:</label>
                            <input
                                type="number"
                                name="sports_dev_fees"
                                value={collegeDetails.sports_dev_fees}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    <Select
                        options={zone}
                        value={zone.find((z) => z.value === collegeDetails.name_of_the_zone)}
                        onChange={(selectedOption) => {
                            const selectedZone = selectedOption ? selectedOption.value : "";
                            setCollegeDetails((prev) => ({
                                ...prev,
                                name_of_the_zone: selectedZone,
                            }));
                        }}
                        required
                    />
                    <h3>Sports Facilities</h3>
                    <label>Indoor Games:</label>
                    <Select
                        options={indoorGamesList}
                        isMulti
                        required
                        value={indoorGamesList.filter((game) =>
                            collegeDetails.sports_facilities.indoorGames.includes(game.value)
                        )}
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, "indoorGames")}
                    />

                    <label>Outdoor Games:</label>
                    <Select
                        options={outdoorGamesList}
                        isMulti
                        required
                        value={outdoorGamesList.filter((game) =>
                            collegeDetails.sports_facilities.outdoorGames.includes(game.value)
                        )}
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, "outdoorGames")}
                    />

                    <label>Total Strength (I Year):</label>
                    <input
                        type="number"
                        name="total_strength_i"
                        value={collegeDetails.total_strength_i}
                        onChange={handleChange}
                        required
                        min="0"
                    />

                    <label>Total Strength (II Year):</label>
                    <input
                        type="number"
                        name="total_strength_ii"
                        value={collegeDetails.total_strength_ii}
                        onChange={handleChange}
                        required
                        min="0"
                    />

                    <label>Total Strength (III Year):</label>
                    <input
                        type="number"
                        name="total_strength_iii"
                        value={collegeDetails.total_strength_iii}
                        onChange={handleChange}
                        required
                        min="0"
                    />

                    <label>Total Strength (IV Year):</label>
                    <input
                        type="number"
                        name="total_strength_iv"
                        value={collegeDetails.total_strength_iv}
                        onChange={handleChange}
                        required
                        min="0"
                    />

                    <label>Total Strength (PG):</label>
                    <input
                        type="number"
                        name="total_strength_pg"
                        value={collegeDetails.total_strength_pg}
                        onChange={handleChange}
                        required
                        min="0"
                    />

                    <div className="submit-btn">
                        <button type="submit">Update</button>
                    </div>
                </form>
            )}
            </div>
        </div>
    );
};

export default EditCollege;
