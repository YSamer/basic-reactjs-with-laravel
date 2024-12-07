import React from "react";
import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../../css/app.css";
import { ContextProvider } from "../contexts/contextProvider";
import router from "./router";
export default function Main() {
    return (
        <React.StrictMode>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </React.StrictMode>
    );
}

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(<Main />);
