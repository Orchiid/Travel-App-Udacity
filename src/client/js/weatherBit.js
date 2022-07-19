/* Global Variables */
const weather = document.querySelector('#weather');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const uv = document.querySelector('#uv');
const precipitation = document.querySelector('#precipitation');
const icon = document.querySelector('.icon');
const server = " http://127.0.0.1:8000";
// Personal API Key for OpenWeatherMap API
let key= '';
const zipExample ='https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key={API_KEY}';
const baseURI ='https://api.weatherbit.io/v2.0/forecast/daily?city=';
import { getData } from './getData';
import { postData } from './postData';
import { sortData } from './sortData';
import { addUrl } from './addUrl';

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', (e) => {
    e.preventDefault();
    const fetch = server + "/fetchUrl"
    const addData = server + "/add"
    const allData = server + "/all"
    addUrl(fetch)
        .then((data) => {
            getNewUrl(data)
            console.log(data)
            const genURL = `${baseURI}${city.value}&key=${data.key}`;
        getData(genURL)
        .then((input) => {
            projectData(input)
            .then((docs) => {
                postData(addData, docs)
                .then((data) => {
                    sortData(allData)
                    .then((data) => {
                        updateData(data);
                    })
                });
            });
        });
    });
});



async function getNewUrl(data) {
    const response = await data;
    if (response.key) {
        key = response.key;
        console.log(key);
    } else {
        console.log('Has not been posted');
    }
}

/* Function to GET Web API Data*/
            
async function projectData(data) {
    try {
        const fact = {
            weather: data.data[0].weather.description,
            icon:data.data[0].weather.icon,
            date: data.data[0].valid_date,
            temp: Math.round(data.data[0].temp),
            precipitation: data.data[0].uv,
        };
        console.log(fact);
        return fact;
    
    } catch (error) {
        console.log(error);
    }
}



/* Function to update data */
async function updateData(data) {
    const response = await data;
    if (response.weather) {
        weather.innerHTML = response.weather;
        let icons = document.createElement('p');
        icons.innerHTML= `<img src="https://www.weatherbit.io/static/img/icons/${response.icon}.png"/>`;
        icon.appendChild(icons);
        let parts = response.date.split('-');
        let myDate = new Date(parts[0], parts[1] - 1, parts[2]); 
        date.innerHTML = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(myDate);
        temp.innerHTML = response.temp + '°';
        precipitation.innerHTML = 'Precipitation:' + response.precipitation;
    } else {
        document.querySelector('error').innerHTML = 'Enter City';
    }
}







