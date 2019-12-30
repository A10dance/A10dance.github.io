// For chrome remote debugging:
// change the USB connection mode to "Audio Source"
// (Phone Settings > Developer Options > USB Configuration).

let hasWebStorage = true;
let username;

function onload() {
    if (typeof (Storage) == "undefined") {
        alert("Sorry! No Web Storage support..");
        hasWebStorage = false;
        return;
    }
    username = document.getElementById("username");
    username.value = localStorage.getItem("username");
}

function markA10dance() {
    if (hasWebStorage) {
        localStorage.setItem("username", username.value);
    }
    alert(`Your attendance was marked successfully, ${username.value}!`);
}

// function enableBT() {
//     // For earlier versions of Windows and Linux, you still have to go to 
//     // chrome://flags/#enable-experimental-web-platform-features, 
//     // enable the highlighted flag, and restart Chrome for now. 

//     navigator.bluetooth.requestDevice({
//             acceptAllDevices: true,
//             optionalServices: ['battery_service']
//         })
//         .then(device => {
//             alert(device);
//         })
//         .catch(error => {
//             alert(error);
//         });
// }





function enableBT() {
    alert("hi");
    console.log('Requesting any Bluetooth Device...');
    navigator.bluetooth.requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        })
        .then(device => {
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
            // Note that we could also get all services that match a specific UUID by
            // passing it to getPrimaryServices().
            console.log('Getting Services...');
            return server.getPrimaryServices();
        })
        .then(services => {
            console.log('Getting Characteristics...');
            let queue = Promise.resolve();
            services.forEach(service => {
                queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                    console.log('> Service: ' + service.uuid);
                    characteristics.forEach(characteristic => {
                        console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                            getSupportedProperties(characteristic));
                    });
                }));
            });
            return queue;
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}

/* Utils */

function getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
        if (characteristic.properties[p] === true) {
            supportedProperties.push(p.toUpperCase());
        }
    }
    return '[' + supportedProperties.join(', ') + ']';
}