/* Global Variables */
const generate = document.querySelector('#generate');
const city = document.querySelector('#city');
const lng = document.querySelector('#lng');
const lat = document.querySelector('#lat');
const citys = document.querySelector('#citys');
const depart = document.querySelector('#depart');
const returns = document.querySelector('#returns');
const departDue = document.querySelector('.departDue');
const returnDue = document.querySelector('.returnDue');
const server = " http://127.0.0.1:8000";
import './styles/style.scss'
import './js/weatherBit'
import './js/pixabay'
import { getData } from './js/getData';
import { postData } from './js/postData';
import { sortData } from './js/sortData';
import { addUrl } from './js/addUrl';
let username = ''
const urlExample ='http://api.geonames.org/search?q=london&style=SHORT&maxRows=1&username={}';
const baseURI ='http://api.geonames.org/searchJSON?&style=SHORT&maxRows=1&q=';


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
            const genURL = `${baseURI}${city.value}&username=${data.username}`;
            getData(genURL)
            .then((data) => {
                projectData(data)
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
    if (response.username) {
        username = response.username;
        console.log(username);
    } else {
        console.log('Has not been posted');
    }
}

/* Function to GET Web API Data*/
async function projectData(data) {
    try {
        const fact = {
            country: data.geonames[0].countryCode,
            lng: data.geonames[0].lng,
            lat: data.geonames[0].lat,
            citys: data.geonames[0].name,
            depart: depart.value,
            return: returns.value,
        };
        return fact;
    
    } catch (error) {
        console.log(error);
    }
}

/* Function to update data */
async function updateData(data) {
    const response = await data;
    if (response.lng) {
        lng.innerHTML = 'Longitude: ' + response.lng;
        lat.innerHTML = 'Latitude: ' + response.lat;
        citys.innerHTML = response.citys + ' ' + response.country;
        departDue.innerHTML = 'Depart date:' + response.depart ;
        returnDue.innerHTML = 'Return date:' + response.return ;
        } else {
        document.querySelector('error').innerHTML = 'Enter City & Departure date';
    }
}







