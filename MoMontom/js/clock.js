const 
    clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1');

function getTime(){
    const 
        date = new Date(),
        hours = date.getHours(),
        miuntes = date.getMinutes(),
        seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        miuntes < 10 ? `0${miuntes}` : miuntes}:${
        seconds < 9 ? `0${seconds}` : seconds}`;
}
function init(){
    getTime();
    setInterval(getTime,1000);
}
init();