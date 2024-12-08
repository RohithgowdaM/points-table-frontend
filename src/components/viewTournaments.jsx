import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCollegeid } from "../utils/apputils";
import '../styles/editTournament.css';

const ViewTournament = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [colleges, setColleges] = useState([]);
    // eslint-disable-next-line
    const [full, setFull] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchCollegeid(setColleges, navigate, setFull);
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/fetch-tournament");
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const getCollegeNameById = (collegeId) => {
        const college = colleges.find(college => college.value === collegeId);
        return college ? college.label : 'Unknown College'; 
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-tournament-page">
                <div>
                    <table className="event-list">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>Category</th>
                                <th>College</th>
                                <th>Event Zone</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.org_id}>
                                    <td>{event['Sport.sport_name']}</td>
                                    <td>{event.sports_category}</td>
                                    <td>{getCollegeNameById(event.college_id)}</td>
                                    <td>{event.type}</td>
                                    <td>{event.start_date}</td>
                                    <td>{event.end_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default ViewTournament;
