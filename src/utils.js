export async function makeRequest(endpoint, body=null) {
    try {

        const options = {
            method: body ? 'PUT' : 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Govee-API-Key': "",
                'Content-Type': 'application/json'
            }
        }

        if(body){
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`https://developer-api.govee.com/${endpoint}`, options);

        const data = await response.json();

        //data.status only exists when we fail... when we succeed the value is called "code" instead lol
        if (data.status && data.status !== 200 || data.message !== "Success") {
            console.log(`Govee responded with an error: ${data.status}: ${data.message}`);
            return [];
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export async function buildDeviceStateList(deviceData){
    
    const returnData = [];
    
    for(const device of deviceData){
        const newDeviceData = {...device};
        newDeviceData.getDeviceState = await getDeviceState(device.device, device.model);
        returnData.push(newDeviceData);
    }

    return returnData;
}

//Set our device state
export async function setDeviceState(device, model, state){
    
    const body = {
        device,
        model,
        "cmd": {
            "name": "turn",
            "value": state ? "on" : "off"
        }
    }

    return makeRequest(`v1/devices/control`, body);
}

async function getDeviceState(device, model){
    return makeRequest(`v1/devices/state?device=${encodeURIComponent(device)}&model=${model}`);
}

