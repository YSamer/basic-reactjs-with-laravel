import { Link } from "react-router-dom";
function Home() {
    return (
        <div>
            <Link to="/login">Login Now</Link>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}

export default Home;
