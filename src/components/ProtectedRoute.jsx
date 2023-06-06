import { useMemo } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = useMemo(() => localStorage.getItem("token"), []);
    
    return token ? children : <Navigate to="/login" />;
}