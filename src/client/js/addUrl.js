export async function addUrl(url) {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    };

}
