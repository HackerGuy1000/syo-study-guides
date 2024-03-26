import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db} from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import Admin from "../Users/Admin/Admin";
import SettingsCog from "../Settings/SettingsCog";

function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const [admin, setAdmin] = useState(1);
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setAdmin(data.admin)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }
        fetchUserName();
    }, [user, loading, navigate]);
    return (
        <>
            <div>
                <SettingsCog/>
                {admin > 1 && <Admin />}
            </div>
        </>
    );
}
export default Dashboard;