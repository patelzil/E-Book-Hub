import React, { useEffect, useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import UserSessionNavBar from './usersessionnavbar.component';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';

// Reference to the link of the file URL on line 22: http://www.africau.edu/

export default function Reader() 
{

const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <>
        <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
            <UserSessionNavBar/>
        </div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <div
                style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '750px',
                }}
            >
            <Viewer fileUrl="http://www.africau.edu/images/default/sample.pdf" plugins={[defaultLayoutPluginInstance]}/>
            </div>
        </Worker>
        </>
    )
}

