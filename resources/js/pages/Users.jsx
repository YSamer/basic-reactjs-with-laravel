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
                setUsers(data.data);
                console.log(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        setLoading(true);
        axiosClient
            .delete(`/users/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="mb-4">Users</div>
                <div className="mb-4">
                    <Link
                        to="/users/new"
                        className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Add User
                    </Link>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">
                                ID
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Email
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.id}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/users/${user.id}/edit`}
                                                className="text-green-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Users;
