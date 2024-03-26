import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./SettingsModal.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function SettingsModal() {
  const [user, loading] = useAuthState(auth);
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
    modal.close();
    modal.style.display = "none";
    console.log("Hiding modal!!!");
  }
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/");
    }
    fetchUserName();
  }, [user, loading,navigate]);
  return (
    <dialog className="dashboard" id="settings-modal" close="true">
      <div className="dashboard__container">
        <button className="close-button" onClick={openSettings}>
          <i className="fa fa-times-circle" id="close" aria-hidden="true"></i>
        </button>
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        {admin > 1 && <div>Admin Level: {admin}</div>}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </dialog>
  )
}

export default SettingsModal