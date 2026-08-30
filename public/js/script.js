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

const map = L.map("map").setView([0,0],16)

 //ye map dikhane ke liye
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution : "Adarsh ke PAPA ka map " // koi bhai name de sakte hii ham
}).addTo(map)

//markers

const markers = {}

socket.on("receive-location",(data)=>{
    const {id , latitude , longitude} = data
    map.setView([latitude , longitude])

    if(markers[id]){
        markers[id].setLatLng([latitude , longitude])
    }
    else{
        markers[id] = L.marker([latitude , longitude]).addTo(map)
    }
})

//disconnet hone par marker hatana 
socket.on("user-disconneted",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }

})