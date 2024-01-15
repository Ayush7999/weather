const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

function getweather(){
    const APIKey = '518cfc4032dd57c291053938f709d213';
    const city = document.getElementById("cityinput").value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`).then(response => response.json()).then(data => {
        
        if(data.cod =='404'){
            cityHide.textContent = city;
            container.style.height='450px';
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active');
            return;
        }
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");


        if(cityHide.textContent==city){
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height='555px';
            container.classList.add('active')
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active')
            error404.classList.remove('active');

            const image = document.getElementById("images");
            const desc = `${data.weather[0].description}`;

            let value=`${data.main.temp}`
            let value1=value-273.15;
            document.getElementById("temp").innerHTML = value1.toFixed()+"°C";

            const hum=`${data.main.humidity}`
            document.getElementById("hump").innerHTML = hum+" %";

            let sp=`${parseInt(data.wind.speed)}`
            document.getElementById("spee").innerHTML = sp+" km/h";

            document.getElementById("description").innerHTML= desc;
            if(desc==="smoke"){
                image.scr="image/fog.png";
            }
            else if(desc==="haze"){
                image.src="image/haze.png";
            }
            else if(desc==="clear sky"){
                image.scr="image/sun(1).png";
            }
            else if(desc==="rain"){
                image.scr="image/rain.png";
            }        
            else if(desc==="snow"){
                image.src="image/snow.png";
            }        
            else{
                image.scr="image/cloudy.png";
            }
        }   
    })
}