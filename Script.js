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
Search_btn.addEventListener('click', function(e)
{
      if(input_city.value !=='')
      {
            document.querySelector('small').className = "small";
            e.preventDefault();
            console.log(input_city.value);
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
     date.innerHTML=``
     temp.innerHTML=`${Math.round(data.main.temp-(273.15))}&degC`;
     minMaxTemp.innerHTML=`${Math.floor(data.main.temp_min -(273.15))}&degC (Min)/${Math.ceil(data.main.temp_max-(273.15))}&degC (Max)`;
     weatherStatus.innerHTML=`${data.weather[0].main}`;
     console.log(data.weather[0].icon);
     statusIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
}