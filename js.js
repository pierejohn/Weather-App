var apiReady
let today = new Date();
let date = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long'
});
let todayHtml = document.getElementById('today')
let dateHtml = document.getElementById('date')
let cityTemp = document.getElementById('cityTemp')
let city = document.getElementById('city')
let countryName= document.getElementById('countryName')
let iconToday = document.getElementById('iconToday')
let visKm = document.getElementById('visKm')
let windDir = document.getElementById('windDir')
let tempCondition = document.getElementById('tempCondition')
let tempRain = document.getElementById('tempRain')
let tomoroName =document.getElementById('tomoroName')
let tomoroMaxTemp=document.getElementById('tomoroMaxTemp')
let tomoroMinTemp=document.getElementById('tomoroMinTemp')
let tomoroLogo=document.getElementById('tomoroLogo')
let tomoroCondition=document.getElementById('tomoroCondition')
let afterTomoroName=document.getElementById('afterTomoroName')
let afterTomoroMaxTemp=document.getElementById('afterTomoroMaxTemp')
let afterTomoroMinTemp=document.getElementById('afterTomoroMinTemp')
let afterTomoroLogo=document.getElementById('afterTomoroLogo')
let afterTomoroCondition=document.getElementById('afterTomoroCondition')
let serach=document.getElementById('search')


today = today.toLocaleDateString('en-US', { weekday: 'long' });
let searchCountry
let aftertommoro=new Map
let tommoro=new Map
var apiTemp7DaysReady
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

dayDetremin = () => {
    for (let i = 0; i < 6; i++) {
        if (today == days[i]) {
            i++
            tommoro.set('name',days[i])
            i++
            aftertommoro.set('name',days[i])
            break
        }
    }
}





async function apiRequest(searchCountry='cairo') {
    
    console.log(searchCountry);
     
    var api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5be13e84c50b45349cb83840242008&q=${searchCountry}&days=7`)
    apiReady = await api.json()

    // apiTemp7Days()
    dayDetremin()
    getTwoDays()
    setToday()
    setTomoroAndAfterData()
}

 function getTwoDays()
{
    tommoro.set('maxtemp',apiReady.forecast.forecastday[1].day.maxtemp_c)
    tommoro.set('mintemp',apiReady.forecast.forecastday[1].day.mintemp_c)
    tommoro.set('icon',apiReady.forecast.forecastday[1].day.condition.icon)
    tommoro.set('condition',apiReady.forecast.forecastday[1].day.condition.text)
    aftertommoro.set('maxtemp',apiReady.forecast.forecastday[2].day.maxtemp_c)
    aftertommoro.set('mintemp',apiReady.forecast.forecastday[2].day.mintemp_c)
    aftertommoro.set('icon',apiReady.forecast.forecastday[2].day.condition.icon)
    aftertommoro.set('condition',apiReady.forecast.forecastday[2].day.condition.text)

    // console.log(tommoro);
    // console.log(aftertommoro);
}
// async function apiTemp7Days()
// {
//     var apiTemp7Days = await fetch('http://api.weatherapi.com/v1/forecast.json?key=5be13e84c50b45349cb83840242008&q=cairo&days=7')
//     apiTemp7DaysReady = await apiTemp7Days.json()
//     console.log(apiTemp7DaysReady);
    


// }


function setToday() {
    todayHtml.innerHTML = today
    dateHtml.innerHTML = date
    tempRain.innerHTML=`${apiReady.current.cloud}%`
    iconToday.src = apiReady.current.condition.icon
    tempCondition.innerHTML= apiReady.current.condition.text
    cityTemp.innerHTML = `${apiReady.current.temp_c}°C`
    visKm.innerHTML = `${apiReady.current.vis_km}km/h`
    windDir.innerHTML = apiReady.current.wind_dir
    city.innerHTML = apiReady.location.name
    countryName.innerHTML = apiReady.location.country
    // console.log('semeeeesssssssssssssssssssssssss');
    
    // console.log(apiReady)

}

function setTomoroAndAfterData()
{
tomoroName.innerHTML=tommoro.get('name')
tomoroMaxTemp.innerHTML=`${tommoro.get('maxtemp')}°C`
tomoroMinTemp.innerHTML=`${tommoro.get('mintemp')}°C`
tomoroLogo.src=tommoro.get('icon')
tomoroCondition.innerHTML=tommoro.get('condition')

afterTomoroName.innerHTML=aftertommoro.get('name')
afterTomoroMaxTemp.innerHTML=`${aftertommoro.get('maxtemp')}°C`
afterTomoroMinTemp.innerHTML=`${aftertommoro.get('mintemp')}°C`
afterTomoroLogo.src=aftertommoro.get('icon')
afterTomoroCondition.innerHTML=aftertommoro.get('condition')
}



serach.addEventListener('keyup',function(e)
{
// console.log(e);
// console.log(serach.value);
apisearch(serach.value)

})

async function apisearch(index = "Cairo")
{
    if(index==' ')
    {
        index = "Cairo"
    }
    
    
    try {
        let searchApi=await fetch(`https://api.weatherapi.com/v1/search.json?key=5be13e84c50b45349cb83840242008&q=${index}`)
    let finalSearchApi=await searchApi.json()
    console.log(searchCountry);

    searchCountry=finalSearchApi[0]
    console.log(searchCountry);
    
    apiRequest(searchCountry.name)
    console.log(finalSearchApi[0]);
    } catch (error) {
        console.log(error);
        
    }
    
    
}

apiRequest()
