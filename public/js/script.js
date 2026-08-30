//io initilization 
const socket = io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
       const {latitude , longitude} = position.coords
       socket.emit("send-location",{latitude , longitude})
    },
    (error) =>{
        console.error(error)
    },
    {
        enableHighAccuracy : true,
        timeout:5000,         //every 5 sec me location check 
        maximumAge:0
    }
)
}

const map = L.map("map").setView([0,0],10)

 //ye map dikhane ke liye
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),{
    attribution : "Adarsh ke PAPA ka map " // koi bhai name de sakte hii ham 
}.addTO(map)
