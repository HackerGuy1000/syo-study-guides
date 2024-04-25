import SettingsModal from './SettingsModal';

function SettingsCog() {


    function openSettings() {
        const modal = document.getElementById("settings-modal");
        modal.showModal();
        modal.style.display = "block";
    }

    return (
        <>
            {/* Settings cog icon that can be clicked to open settings */}
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous" />

            <button className="open-button" onClick={openSettings}>
                <i className="fa fa-cog" id="settings" aria-hidden="true"></i>
            </button>
            
            {/* Contains actual information for settings */}
            <SettingsModal />
        </>
    )
}

export default SettingsCog