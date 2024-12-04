import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/collegeDashboard.css'

const CollegeDashboard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [collegeData, setCollegeData] = useState({});

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
                console.log(response.data.college);
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

    return (
        <div className="dashboard-container">
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
                        <th>PED Awards</th>
                        <td>{collegeData.ped_awards}</td>
                    </tr>
                    <tr>
                        <th>PED Contact</th>
                        <td>{collegeData.ped_contact}</td>
                    </tr>
                    <tr>
                        <th>PED Name</th>
                        <td>{collegeData.ped_name}</td>
                    </tr>
                    <tr>
                        <th>PED Qualification</th>
                        <td>{collegeData.ped_qualification}</td>
                    </tr>
                    <tr>
                        <th>PED Years of Service</th>
                        <td>{collegeData.ped_years_of_service}</td>
                    </tr>
                    <tr>
                        <th>PED Years of Service in Institute</th>
                        <td>{collegeData.ped_years_of_service_in_institute}</td>
                    </tr>
                    <tr>
                        <th>Principal Contact Number</th>
                        <td>{collegeData.principle_contact_number}</td>
                    </tr>
                    <tr>
                        <th>Principal Name</th>
                        <td>{collegeData.principle_name}</td>
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

            <div className="sports-facilities">
                <h2>Sports Facilities</h2>
                <div className="facilities-container">
                    {collegeData.sports_facilities &&
                        Object.entries(collegeData.sports_facilities).map(([facilityType, games]) => (
                            <div key={facilityType} className="facility-card">
                                <h3 className="facility-type">{facilityType.charAt(0).toUpperCase() + facilityType.slice(1)}</h3>
                                <ul className="games-list">
                                    {games.map((game, index) => (
                                        <li key={index} className="game-item">{game}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default CollegeDashboard;
