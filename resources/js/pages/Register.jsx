import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../services/axiosClient";

export default function Register() {
    const { setToken, setUser } = useStateContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.error(response.data.message);
                    setError(response.data.message);
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h1>
                {error && (
                    <div className="mb-4 text-red-500 text-center">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            ref={nameRef}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            ref={passwordRef}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
