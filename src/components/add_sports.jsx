import '../styles/add_sports.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../utils/apputils";
import showConfirmation from '../utils/showConfirmation'
import axios from "axios";

const AddSports = () => {
    const [loading, setLoading] = useState(true);
    const [sport_name, setSport_name] = useState('');
    const [sports, setSports] = useState([]);
    const [filteredSports, setFilteredSports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData(navigate, setLoading);
        const interval = setInterval(() => {
            fetchDashboardData(navigate, setLoading);
        }, 3600000);
        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.post('http://localhost:5000/admin/sports-list');
                setSports(response.data.all_sports);
                setFilteredSports(response.data.all_sports);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const check = sports.some(item => item.sport_name === sport_name);
            if (check) {
                alert('Sport already exists');
                return;
            }
            const userResponse = await showConfirmation(`Are you sure you want to add ${sport_name}`);
            if (userResponse) {
                const response = await axios.post('http://localhost:5000/admin/add-sport', { sport_name: sport_name });
                setSport_name('');
                alert('Sport added successfully');
                navigate(0);
            }
        } catch (error) {
            console.log(error);
            if (error.status === 409) {
                console.log('Sport already exists');
            } else {
                alert('Some error occurred');
            }
            navigate('/admin/dashboard');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toUpperCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredSports(sports);
        } else {
            setFilteredSports(sports.filter(sport => sport.sport_name.includes(term)));
        }
    };

    const paginatedSports = filteredSports.slice(0, 10); // Display only the first 10 sports

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="form-container">
            <h1>Add Sports</h1>

            <input
                type="text"
                placeholder="Search for a sport..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
            />

            {sports.length !== 0 && (
                <div className="table-wrapper">
                    <table className="sports-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSports.map((item) => (
                                <tr key={item.sport_id}>
                                    <td>{item.sport_id}</td>
                                    <td>{item.sport_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className='form-container'>
                <form onSubmit={handleSubmit} className="college-form">
                    <div className="form-group">
                        <label htmlFor="sport_name">Enter the new Sport name</label>
                        <input
                            type="text"
                            name="sport_name"
                            id="sport_name"
                            onChange={(e) => setSport_name(e.target.value.toUpperCase())}
                            required
                            pattern="[A-Za-z]+( [A-Za-z]+)*"
                            title="Only characters and no two consecutive spaces are allowed"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Add Sport</button>
                </form>
            </div>
        </div>
    );
};

export default AddSports;
