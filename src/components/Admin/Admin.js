import React, { useState } from 'react'
import "./Admin.css"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'


function Admin() {
    const [user, loading, error] = useAuthState(auth);

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handlePath = () => {
        if (!file) { return; }
        if (file) {
            const fileModal = document.getElementById("file-selector");
            fileModal.showModal();
            fileModal.style.display = "block";
        }
    };
    const handleUpload = () => {
        const fileModal = document.getElementById("file-selector");
        const selection = document.getElementById("path").value
        console.log(selection);
        if (selection != "Select" && file) {
            const storageRef = ref(storage, `${selection}/${file.name}`)
            uploadBytes(storageRef, file).then(() => {
                listAll(storageRef).then(async (rest) => {
                    
                })
                alert("File Uploaded");
                fileModal.close();
                fileModal.style.display = "none"

            })
        }
        else if (!file) {
            console.log("No file :(")
        }

    }

    return (
        <div className="admin-page">
            <div className="admin-box">
                <input className="input-button" id="files" type="file" onChange={handleFileChange} />
                <button className="upload" onClick={handlePath}>Choose Path</button>
            </div>
            <dialog id="file-selector" close="true">
                <div className="field">
                    <div className="selection">
                        <label className="label-path" htmlFor="path">Path</label>
                        <select
                            id="path"
                            name="path"
                            className="inputName"
                        // value={formik.values.size}
                        // onChange={formik.handleChange}
                        >
                            <option disabled hidden defaultValue>Select</option>
                            <option value="APWH">APWH</option>
                            <option value="Images">Images</option>
                            <option value="Vexology">Vexology</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Chemistry">Chemistry</option>
                        </select>
                    </div>
                    <button className="upload" onClick={handleUpload}>Upload</button>
                </div>
            </dialog>
        </div>
    );

}

export default Admin