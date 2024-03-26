import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import SettingsCog from '../Settings/SettingsCog';
import PdfComp from './PdfComp';

function Viewer() {



    return (
        <>
            <SettingsCog />
            <PdfComp />
        </>

    )
}

export default Viewer