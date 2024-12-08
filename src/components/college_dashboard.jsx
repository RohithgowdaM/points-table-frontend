import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/collegeDashboard.css';
import ViewTournament from "./viewTournaments";
import {logout} from '../utils/logout'

const CollegeDashboard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [collegeData, setCollegeData] = useState({});
    const [currentView, setCurrentView] = useState("collegeDetails");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login");
            setLoading(false);
            navigate("/");
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/college/dashboard", {
                    headers: { Authorization: token },
                });
                setCollegeData(response.data.college);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.data.error === "Token Expired") {
                    alert("Session expired. Please login again");
                    localStorage.removeItem("token");
                    navigate("/");
                } else {
                    alert("An error occurred");
                }
                setLoading(false);
                navigate("/");
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) {
        return <h1 className="loading">Loading...</h1>;
    }

    const renderCollegeDetails = () => (
        <div className="college-details">
            <h1 className="dashboard-title">College Dashboard</h1>
            <table className="data-table">
                <tbody>
                    <tr>
                        <th>College ID</th>
                        <td>{collegeData.college_id}</td>
                    </tr>
                    <tr>
                        <th>College Name</th>
                        <td>{collegeData.college_name}</td>
                    </tr>
                    <tr>
                        <th>Name of the Zone</th>
                        <td>{collegeData.name_of_the_zone}</td>
                    </tr>
                    <tr>
                        <th>Sports Development Fees</th>
                        <td>{collegeData.sports_dev_fees}</td>
                    </tr>
                    <tr>
                        <th>Total Strength I</th>
                        <td>{collegeData.total_strength_i}</td>
                    </tr>
                    <tr>
                        <th>Total Strength II</th>
                        <td>{collegeData.total_strength_ii}</td>
                    </tr>
                    <tr>
                        <th>Total Strength III</th>
                        <td>{collegeData.total_strength_iii}</td>
                    </tr>
                    <tr>
                        <th>Total Strength IV</th>
                        <td>{collegeData.total_strength_iv}</td>
                    </tr>
                    <tr>
                        <th>Total Strength PG</th>
                        <td>{collegeData.total_strength_pg}</td>
                    </tr>
                </tbody>
            </table>
            <div className="principal-ped-section">
                <h2 className="section-title">Principal & PED Details</h2>
                <div className="detail-group">
                    <div className="detail-card">
                        <h3 className="detail-title">Principal</h3>
                        <div className="detail-content">
                            <p><strong>Name:</strong> {collegeData.principle_name}</p>
                            <p><strong>Contact Number:</strong> {collegeData.principle_contact_number}</p>
                        </div>
                    </div>
                    <div className="detail-card">
                        <h3 className="detail-title">PED</h3>
                        <div className="detail-content">
                            <p><strong>Name:</strong> {collegeData.ped_name}</p>
                            <p><strong>Contact:</strong> {collegeData.ped_contact}</p>
                            <p><strong>Awards:</strong> {collegeData.ped_awards}</p>
                            <p><strong>Qualification:</strong> {collegeData.ped_qualification}</p>
                            <p><strong>Years of Service:</strong> {collegeData.ped_years_of_service}</p>
                            <p><strong>Years of Service in Institute:</strong> {collegeData.ped_years_of_service_in_institute}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

    const renderUpcomingEvents = () => (
        <div className="upcoming-events">
            <h1 className="dashboard-title">Upcoming Events</h1>
            <ViewTournament />
        </div>
    );

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-container">
                    <a href="/" className="navbar-logo">College Portal</a>
                    <div className="navbar-links">
                        <a
                            href="#"
                            className={`navbar-link ${currentView === "collegeDetails" ? "active" : ""}`}
                            onClick={() => setCurrentView("collegeDetails")}
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className={`navbar-link ${currentView === "upcomingEvents" ? "active" : ""}`}
                            onClick={() => setCurrentView("upcomingEvents")}
                        >
                            Upcoming Events
                        </a>
                        <a onClick={()=>{logout();navigate('/')}} className="navbar-link">Logout</a>
                    </div>
                </div>
            </nav>
            {currentView === "collegeDetails" ? renderCollegeDetails() : renderUpcomingEvents()}
        </div>
    );
};

export default CollegeDashboard;
