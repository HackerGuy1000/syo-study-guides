import React, { useState } from 'react'
import "./Admin.css"
import { storage } from "../../../firebase";
import { ref, uploadBytes, listAll } from 'firebase/storage'


function Admin() {
    // const [user, loading, error] = useAuthState(auth);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleNameChange = (e) => {
        if (e.target.value) {
            setFileName(e.target.value);
            console.log(fileName);
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
        if (selection !== "Select" && file) {
            const storageRef = ref(storage, `${selection}/${file.name}`)

            const metadata = {
                name: fileName
            }

            uploadBytes(storageRef, file,metadata).then(() => {
                listAll(storageRef).then(async (rest) => {
                    console.log(rest);
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
                <input className="input-button" id="files" type="file" hidden onChange={handleFileChange} />
                <label id="file-button" for="files">Choose File</label>
                <input className = "input-text" type="text" placeholder="File Name" onChange={handleNameChange} />
                <button className="upload-file" onClick={handlePath}>Choose Path</button>
            </div>
            <dialog id="file-selector" close="true">
                <div className="field">
                    <div className="selection">
                        <label className="label-path" htmlFor="path">Path</label>
                        <select
                            id="path"
                            name="path"
                            className="inputName"
                        >
                            <option disabled hidden defaultValue>Select</option>
                            <option value="APWH">APWH</option>
                            <option value="Images">Images</option>
                            <option value="Vexology">Vexology</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics">Physics</option>
                        </select>
                    </div>

                    <button className="upload" onClick={handleUpload}>Upload</button>
                </div>
            </dialog>
        </div>
    );

}

export default Admin