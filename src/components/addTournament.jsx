import React, { useEffect, useState } from "react";
import { fetchDashboardData, fetchCollegeid } from "../utils/apputils";
import axios from "axios";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { tournaments, category, special } from "../data/getOptions";
import showConfirmation from '../utils/showConfirmation';

const AddTournament = () => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [sports, setSports] = useState([]);
    const [full, setFull] = useState([]);
    const [final, setFinal] = useState([]);
    const [formdata, setFormdata] = useState({
        sport_id: null,
        type: '',
        college_id: null,
        sports_category: '',
        start_date: '',
        end_date: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData(navigate, setLoading);
        const interval = setInterval(() => {
            fetchDashboardData(navigate, setLoading);
        }, 3600000);
        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        fetchCollegeid(setOptions, navigate, setFull);
        const fetchdata = async () => {
            try {
                const response = await axios.post('http://localhost:5000/admin/sports-list');
                const transformedOptions = response.data.all_sports.map((col) => ({
                    label: col.sport_name,
                    value: col.sport_id,
                }));
                setSports(transformedOptions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, [navigate]);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [minEndDate, setMinEndDate] = useState(getCurrentDate());
    const todayDate = getCurrentDate();

    const handleFilter = (value) => {
        const vari = special.filter((temp) => temp.value === value);
        if (vari.length !== 0) {
            setFinal(options);
        } else {
            const temp = full.filter((college) =>
                college.name_of_the_zone.includes(value)
            );
            const transformedOptions = temp.map((col) => ({
                label: col.college_name,
                value: col.college_id,
            }));
            setFinal(transformedOptions);
        }
        setFormdata((prevFormdata) => ({
            ...prevFormdata,
            college_id: null,
        }));
    };

    const handleOnchange = (name, value) => {
        setFormdata((prevFormdata) => {
            const updatedFormdata = { ...prevFormdata, [name]: value };
            if (name === "start_date") {
                setMinEndDate(value); // Update minEndDate dynamically
                if (new Date(updatedFormdata.end_date) < new Date(value)) {
                    updatedFormdata.end_date = value; // Reset end_date to start_date if invalid
                }
            }
            return updatedFormdata;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userResponse = await showConfirmation(`Please verify the information once`);
            if (userResponse) {
                const response = await axios.post('http://localhost:5000/admin/add-tournament', formdata);
                alert('Tournament added successfully');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            if (error.status === 406) {
                alert(error.response.data.message);
                navigate(0);
            }
            else
                console.log(error);
        }
    };

    if (loading) {
        return <p>Loading....</p>;
    }
    return (
        <div>
            <h1>Enter tournament organization details</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="sport_name">Select the sport</label>
                    <Select
                        required
                        options={sports}
                        onChange={(selected) => handleOnchange('sport_id', selected.value)}
                    />
                    <label htmlFor="type">Select the tournament type</label>
                    <Select
                        required
                        options={tournaments}
                        onChange={(selected) => { handleFilter(selected.value); handleOnchange('type', selected.value); }}
                    />
                    <label htmlFor="college_id">Select the College</label>
                    <Select
                        required
                        options={final}
                        onChange={(selected) => handleOnchange('college_id', selected.value)}
                        value={final.find((option) => option.value === formdata.college_id) || null}
                    />
                    <label htmlFor="category">Category</label>
                    <Select
                        required
                        options={category}
                        onChange={(selected) => handleOnchange('sports_category', selected.value)}
                    />
                    <label htmlFor="start_date">Start date</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        min={todayDate}
                        onChange={(e) => handleOnchange("start_date", e.target.value)}
                        required
                    />
                    <label htmlFor="end_date">End date</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        min={minEndDate}
                        onChange={(e) => handleOnchange("end_date", e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddTournament;
