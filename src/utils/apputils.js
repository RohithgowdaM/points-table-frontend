import axios from 'axios';

// Function to fetch dashboard data
export const fetchDashboardData = async (navigate, setLoading) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
        setLoading(false);
        navigate('/admin/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:5000/admin/dashboard', {
            headers: { Authorization: token },
        });
        setLoading(false);
        return response.data;
    } catch (error) {
        console.log("Message", error.response?.data?.error || "Unknown error");
        if (error.response) {
            if (error.response.status === 401 && error.response.data.error === 'Token Expired') {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/admin/login');
            } else {
                alert('Some unknown error has occurred');
            }
        }
        navigate('/admin/login');
        setLoading(false);
    }
};

// Function to fetch college options
export const fetchCollegeOptions = async (setOptions, navigate) => {
    try {
        const response = await axios.get('http://localhost:5000/college/college_list');
        const transformedOptions = response.data.college.map(college => ({
            label: college,
            value: college,
        }));
        setOptions(transformedOptions);
    } catch (error) {
        console.log(error);
        alert('Some unknown error occurred');
        navigate('/admin/login');
    }
};


export const fetchCollegeid = async (setOptions, navigate, setFiltered) => {
    try {
        const response = await axios.post('http://localhost:5000/admin/get-collegeid');
        const transformedOptions = response.data.college.map((col) => ({
            label: col.college_name,
            value: col.college_id,
        }));
        setFiltered(response.data.college);
        setOptions(transformedOptions);
    } catch (error) {
        console.log(error);
        alert('Some unknown error occurred');
        navigate('/admin/dashboard');
    }
};
