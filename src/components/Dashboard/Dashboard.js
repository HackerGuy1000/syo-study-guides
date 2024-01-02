import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import SettingsModal from "../SettingsModal/Settings";
import Admin from "../Admin/Admin";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState(1);
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setAdmin(data.admin)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    function openSettings() {
        const modal = document.getElementById("settings-modal");
        modal.showModal();
        modal.style.display = "block";
    }
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }
        fetchUserName();
    }, [user, loading]);
    return (
        <>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous" />
            <div className="dashboard-page">
                <button className="open-button" onClick={openSettings}>
                    <i className="fa fa-cog" id="settings" aria-hidden="true"></i>
                </button>
                <SettingsModal />
            {admin > 1 && <Admin/>}
            </div>
        </>
    );
}
export default Dashboard;