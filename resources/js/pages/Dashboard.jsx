import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <Link to="/login">Login Now</Link>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
}

export default Dashboard;
