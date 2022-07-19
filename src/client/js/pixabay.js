/* Global Variables */
const picture = document.querySelector('#picture');
// Personal API Key for OpenWeatherMap API
let pix= '';
const server = " http://127.0.0.1:8000";
const zipExample ='https://pixabay.com/api/?key={key}&q=yellow+flowers&image_type=photo';
const baseURI ='https://pixabay.com/api/?key=';
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
            getNewUrl(data.pix)
            console.log(data.pix)
            const pix = data.pix
            const genURL = `${baseURI}${pix}&q=${city.value}&image_type=photo`;
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
    if (response.pix) {
        pix = response.pix;
        console.log(pix);
    } else {
        console.log('Has not been posted');
    }
}

/* Function to GET Web API Data*/
            
async function projectData(data) {
    try {
        const fact = {
            picture:data.hits[0].webformatURL,
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
    if (response.picture) {
        picture.innerHTML = `<img src="${response.picture} "/>`;
    } else {
        document.querySelector('.error').innerHTML = 'Enter City';
    }
}







