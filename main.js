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

function enableBT() {
    // For earlier versions of Windows and Linux, you still have to go to 
    // chrome://flags/#enable-experimental-web-platform-features, 
    // enable the highlighted flag, and restart Chrome for now. 

    navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
        })
        .then(device => {
            console.log(device);
            alert('Name: ' + device.name);
        })
        .catch(error => {
            alert(error);
        });


}