import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../services/axiosClient";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <div>
            <Link to="/users/new" className="text-blue-500 hover:underline">
                Add new user
            </Link>
        </div>
    );
}

export default Users;
