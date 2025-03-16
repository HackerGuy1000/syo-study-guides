import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useState } from "react";

// Current implementation of creating protected routes, will probably change this later based on different user status implementations 
const RequireAuth = () => {
    const [user, loading] = useAuthState(auth);

    const [isFetching, setFetching] = useState(true);

    const location = useLocation();



    return (
        user
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;