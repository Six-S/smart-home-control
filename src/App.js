import React from "react";
import Card from "./card";
import { useEffect } from 'react';
import { buildDeviceStateList, makeRequest } from './utils.js';

//init our list of devices
const devices = await makeRequest('v1/devices');
const deviceList = await buildDeviceStateList(devices.devices);

console.log("WHAT THE HECK IS IN HERE: ", deviceList);

const styles = {
    header: {
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 'bold',
        fontSize: '36px',
        color: '#e0e0e0'
    },
    containerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}

//The returned data is structured really poorly
//So lets make everything simpler so we can easily tell if a device is on or off...
deviceList.map((device) => {

    const powerState = device.getDeviceState?.properties?.[1]?.powerState ?? null;

    if(powerState){
        const state = powerState == "on" ? true : false;
        device.powerState = state;
    }
});

const App = () =>{

    useEffect(() => {
        document.body.style.backgroundColor = '#1c1c1c';
        return () => {
            document.body.style.backgroundColor = ''; // Reset background color on component unmount
        };
    }, []);

    return (
        <div className="app">
        <h1 style={styles.header}>
            Smart Home Controller
        </h1>
        <div style={styles.containerStyle}>
            {deviceList.map((card, index) => (
            <Card
                key={index}
                title={card.deviceName}
                model={card.model}
                description={card.device}
                initialToggleState={card.powerState}
            />
            ))}
        </div>
          
        </div>
    )
}

export default App