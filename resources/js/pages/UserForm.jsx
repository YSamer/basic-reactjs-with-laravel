import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../services/axiosClient";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch user data for editing
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setUser(data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to load user data.");
                    setLoading(false);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const apiCall = id
            ? axiosClient.put(`/users/${id}`, user)
            : axiosClient.post("/users", user);

        apiCall
            .then(() => {
                navigate("/users");
            })
            .catch((err) => {
                setError("Failed to save user. Please try again.");
                setLoading(false);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">
                {id ? `Edit User ${user?.name ?? ""}` : "Add New User"}
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {!id && (
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/users")}
                        className="text-gray-500 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;
