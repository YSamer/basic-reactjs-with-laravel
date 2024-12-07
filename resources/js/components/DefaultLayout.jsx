import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = () => {
        localStorage.clear("ACCESS_TOKEN");
    };
    return (
        <div
            id="defaultLayout"
            className="min-h-screen bg-gray-100 text-gray-900"
        >
            <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                <div className="text-lg font-semibold">Header</div>
                <div className="flex items-center space-x-4">
                    <span className="font-medium">{user.name}</span>
                    <a
                        href="/"
                        onClick={onLogout}
                        className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </a>
                </div>
            </header>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
