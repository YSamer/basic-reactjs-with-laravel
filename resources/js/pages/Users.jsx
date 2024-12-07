import { Link } from "react-router-dom";
function Users() {
    return (
        <div>
            <Link to="/login">Login Now</Link>
            <h1>Welcome to the Users Page</h1>
        </div>
    );
}

export default Users;
