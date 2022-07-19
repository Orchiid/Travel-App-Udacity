/* Function to retrieve data */
export async function sortData(url) {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    };

}
