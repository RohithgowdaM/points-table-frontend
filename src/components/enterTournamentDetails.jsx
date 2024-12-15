import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { fetchCollegeid, fetchDashboardData } from "../utils/apputils";
import showConfirmation from "../utils/showConfirmation";

const EnterTournamentDetails = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [editedEvent, setEditedEvent] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [full, setFull] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData(navigate, setLoading);
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
    }, []);

    const getCollegeNameById = (collegeId) => {
        const college = colleges.find(college => college.value === collegeId);
        return college ? college.label : 'Unknown College'; 
    };

    const handleEditClick = (event) => {
        setEditedEvent(event);
    };

    const handleOnchange = (name, value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMaxStartDate = () => {
        const today = getCurrentDate();
        return editedEvent && editedEvent.start_date ? 
            today < editedEvent.start_date ? editedEvent.start_date : today 
            : today;
    };

    const handleUpdate = async () => {
        try {
            const userResponse = await showConfirmation("Are you sure you want to update this tournament?");
            if (userResponse) {
                await axios.put(`http://localhost:5000/admin/update-tournament`, {
                    org_id: editedEvent.org_id,   
                    college_id: editedEvent.college_id,
                    start_date: editedEvent.start_date, 
                    end_date: editedEvent.end_date,  
                });
                alert("Tournament updated successfully");
                setEditedEvent(null); 
                navigate(0); 
            }
        } catch (error) {
            console.error("Error updating tournament:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-tournament-page">
            <h1>Edit Tournaments</h1>
            {!editedEvent ? (
                <div>
                    <h2>All Events</h2>
                    <table className="event-list">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Event Zone</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
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
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditClick(event)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="edit-form-container">
                    <h2>Edit Tournament</h2>
                    <form>
                        <label>Org ID</label>
                        <input
                            type="text"
                            value={editedEvent.org_id}
                            readOnly
                            disabled
                        />
                        
                        <label>College</label>
                        <Select
                            options={colleges}
                            value={colleges.find((college) => college.value === editedEvent.college_id)}
                            onChange={(selected) => handleOnchange("college_id", selected.value)}
                        />
                        
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={editedEvent.start_date}  
                            min={getMaxStartDate()} 
                            onChange={(e) => handleOnchange("start_date", e.target.value)}  
                        />

                        <label>End Date</label>
                        <input
                            type="date"
                            value={editedEvent.end_date}  
                            min={editedEvent.start_date}  
                            onChange={(e) => handleOnchange("end_date", e.target.value)} 
                        />

                        <button type="button" onClick={handleUpdate}>
                            Update
                        </button>
                        <button type="button" onClick={() => setEditedEvent(null)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EnterTournamentDetails;