const weather =
{
    Key:"29f4ce2907ae7d75abf25be114b9ee70",

   baseurl: "https://api.openweathermap.org/data/2.5/weather?"
}

const Search_btn = document.querySelector('.button');
let weatherInfo = document.querySelector('.weather-info');
let input_city = document.querySelector('.input-city');
let city = document.querySelector('#city');
let date=document.querySelector('.date');
let temp = document.querySelector('.temperature');
let minMaxTemp = document.querySelector('.min-max-temp');
let weatherStatus = document.querySelector('.weather-status');
let statusIcon = document.querySelector('.weather-icon');
let pressure = document.querySelector('.pressureData');
let humidity = document.querySelector('.humidityData');

console.log(statusIcon);
Search_btn.addEventListener('click', function(e)
{
      if(input_city.value !=='')
      {
            document.querySelector('small').className = "small";
            e.preventDefault();
            fetch(`${weather.baseurl}q=${input_city.value}&appid=${weather.Key}`)
            .then(response => {return response.json()})
            .then(data =>  showWeatherInfo(data)    
            );
            weatherInfo.style.cssText= 'display:flex;';
      } 
      else{
            document.querySelector('small').className = "smart";
            weatherInfo.style.cssText= 'display:none;';
      }
});

 function showWeatherInfo(data)
{    
     console.log(data);
     city.innerHTML=`${data.name}, ${data.sys.country}`;
     const todayDate= new Date();
     date.innerHTML= dateManage(todayDate);
     temp.innerHTML=`${Math.round(data.main.temp-(273.15))}&degC`;
     minMaxTemp.innerHTML=`<i class="fas fa-temperature-low"></i>&nbsp ${Math.floor(data.main.temp_min -(273.15))}&degC (Min) &nbsp  / &nbsp  <i class="fas fa-temperature-high"></i>&nbsp  ${Math.ceil(data.main.temp_max-(273.15))}&degC (Max)`;
     weatherStatus.innerHTML=`${data.weather[0].main}`;
     statusIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
     pressure.innerHTML=`${data.main.pressure} mbar`;
     humidity.innerHTML=`${data.main.humidity} %`;
     
     if(data.weather[0].main ==='Clouds')
     {
           document.body.style.backgroundImage='url("Images/cloudy.jpg")';
     }
     else if (data.weather[0].main ==='Rain')
     {
           document.body.style.backgroundImage='url("Images/rain.jpg")';
     }
     else if (data.weather[0].main ==='Haze')
     {
           document.body.style.backgroundImage='url("Images/haze.jpg")';
     }
     else if (data.weather[0].main ==='Clear')
     {
           document.body.style.backgroundImage='url("Images/Sunny2.jpg")';
     }
     else if (data.weather[0].main ==='Thunderstorm')
     {
           document.body.style.backgroundImage='url("Images/thunderstorm.jpg")';
     }
     else if (data.weather[0].main ==='Drizzle')
     {
           document.body.style.backgroundImage='url("Images/rain.jpg")';
     }
     else if (data.weather[0].main ==='Snow')
     {
           document.body.style.backgroundImage='url("Images/snow.jpg")';
     }
}

function dateManage(todayDate){
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let year = todayDate.getFullYear();
  let date = todayDate.getDate();
  let day = days[todayDate.getDay()];
  let month = months[todayDate.getMonth()];
   return `${date} &nbsp ${month},&nbsp (${day}), &nbsp ${year}`;
}