const weather = document.querySelector('.js-date');
const API_KEY = '2749b35e8af7eebd9cbeb6f242922016';
const COORDS = 'coords';

function getWeater(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}





function handleGeoSucces(position){
    const latitude =position.coords.latitude,
        longitude = position.coords.longitude,
        coordsObj = {
            latitude,
            longitude
        }
        saveCoords(coordsObj);
        getWeater(latitude,longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}



function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}








function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords)
        getWeater(parseCoords.latitude,parseCoords.longitude);
    }
}



function init(){
    loadCoords();
}
init();