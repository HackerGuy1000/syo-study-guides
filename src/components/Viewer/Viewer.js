import { useState, useEffect } from "react";

import "./Viewer.css";
import SettingsCog from "../Settings/SettingsCog";

import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";

const Viewer = () => {
    const storageRef = ref(storage, `Physics/Summer Assignment with Solutions.pdf`)

    const [pdfUrl, setPdfUrl] = useState(null);


    useEffect(() => {
        const fileArray = [];

        listAll(storageRef).then((res) => {
            getMetadata(storageRef)
                .then((metadata) => {
                    console.log(metadata);
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                });

        })

        getDownloadURL(storageRef).then((url) => {
            setPdfUrl(url);
        })
    }, [])


    return (
        <>
            <SettingsCog />
            {pdfUrl !== null && (
                <>
                    <dialogog></dialogog>
                    <embed type="application/pdf" src={pdfUrl} id="pdf-viewer" width="100%" height="100%" />
                </>
            )}
        </>
    );
}


export default Viewer;

