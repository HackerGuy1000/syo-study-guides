import { useState, useEffect } from "react";

import "./Viewer.css";
import SettingsCog from "../Settings/SettingsCog";

import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Viewer = () => {
    const [folders, setFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [fileLinks, setFileLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const storageRef = ref(storage);
                const res = await listAll(storageRef);
                const folderNames = res.prefixes.map(folderRef => folderRef.name);
                setFolders(folderNames);
            } catch (error) {
                console.error("Error listing folders:", error);
            }
        };

        fetchFolders();
    }, []);

    useEffect(() => {
        if (currentFolder) {
            const fetchFileLinks = async () => {
                setLoading(true);
                try {
                    const folderRef = ref(storage, `${currentFolder}/`);
                    const res = await listAll(folderRef);
                    const links = await Promise.all(
                        res.items.map(async (itemRef) => {
                            const url = await getDownloadURL(itemRef);
                            return { name: itemRef.name, url };
                        })
                    );
                    setFileLinks(links);
                } catch (error) {
                    console.error("Error listing files:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchFileLinks();
        }
    }, [currentFolder]);

    return (
        <>
            <SettingsCog />
            {!currentFolder ? (
                <ul>
                    {folders.map((folder, index) => (
                        <li key={index}>
                            <button onClick={() => setCurrentFolder(folder)}>
                                {folder}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <button onClick={() => setCurrentFolder(null)}>Back to folders</button>
                    {loading ? (
                        <p>Loading files...</p>
                    ) : (
                        <ul>
                            {fileLinks.map((file, index) => (
                                <li key={index}>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    );
}

export default Viewer;

